package main

import(
	"context"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Book struct {
	ID     bson.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Title  string `json:"title,omitempty" bson:"title,omitempty"`
	Author string `json:"author,omitempty" bson:"author,omitempty"`
}
var bookCollection *mongo.Collection
func connectDB() {
	
    err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	MONGO_URI := os.Getenv("MONGO_URI")
	opts := options.Client().ApplyURI(MONGO_URI)

	client, err := mongo.Connect(opts)
	if err != nil {
		panic(err)
	}
		
		bookCollection = client.Database("bookstore").Collection("books")
}

func main(){
	connectDB()
   app := fiber.New()

   app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

   app.Get("/book", libsGet)
   app.Post("/book", libsPost)
   app.Put("/book/:id", libsPut)
   //app.Delete("/book:id", libsDelete)

   log.Println("Server running on port 3000")
   log.Fatal(app.Listen(":3000"))
} 

func libsPost(c *fiber.Ctx) error {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()


	var books Book

	if err := c.BodyParser(&books); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to parse request body",
		})
	}

   newBook := Book{
    ID:     bson.NewObjectID(), 
    Title:  books.Title,
    Author: books.Author,
}

	_, err := bookCollection.InsertOne(ctx, newBook)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to insert book into database",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(newBook)
     

}

func libsGet(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var books []Book
	cursor, err := bookCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "cant find books",
		})
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &books); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "cant find books",
		})
	}



	return c.Status(fiber.StatusOK).JSON(books)
}

func libsPut(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	
	
	var updateBooks Book
	userId := c.Params("id")
	objId, err:= bson.ObjectIDFromHex(userId)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid ID format",
        })
	}
	if err := c.BodyParser(&updateBooks); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse books",
		})
	}

	filter := bson.M{"_id": objId}
	update := bson.M{
		"$set": bson.M {
			"title" : updateBooks.Title,
			"author": updateBooks.Author,
		},
	}

	result, err := bookCollection.UpdateOne(ctx, filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "cant update books",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":	" update books",
		"modified": result.ModifiedCount,
	})

}