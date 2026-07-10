package main

import(
	"fmt"
	"context"
	"log"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/options"
	 "github.com/gofiber/fiber/v2"
	 "go.mongodb.org/mongo-driver/bson"
	 "go.github.com/joho/godotenv"
)

type Book struct {
	ID     string `json:"id,omitempty" bson:"_id,omitempty"`
	Title  string `json:"title,omitempty" bson:"title,omitempty"`
	Author string `json:"author,omitempty" bson:"author,omitempty"`
}

func connectDB() *mongo.Client 
{
    err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	MONGO_URI := os.Getenv("MONGO_URI")
	opts := options.Client().ApplyURI(MONGO_URI)

	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}
	collection := client.Database("bookstore").Collection("books")

	defer func(){
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
		
	return client
}

func main(){
   app := fiber.New()

   app.Get("/", libsGet)
   app.Post("/book", libsPost)
   app.Put("/book", libsPut)
   app.Delete("/book:id", libsDelete)

   log.Fatal(app.Listen(":3000"))
   log.Println("Server running on port 3000")
} 

func libsPut(c *fiber.Ctx) error {
	client := connectDB()

	var books []Book

	if err := c.BodyParser(&books); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to parse request body",
		})
	}

	newBook := Book{
		ID: primitive.NewObjectID().Hex(),
		Title: books.Title,
		Author: books.Author,
	}

	result, err := client.InsertOne(context.TODO(), newBook)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to insert book into database",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(result)
     

}

func libsGet(c *fiber.Ctx) error {
	client := connectDB()

	var books []Book
	objId, _ := c.Params("id")
	err := client.FindOne(context.TODO(), bson.M{"id": objId}).Decode(&books)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Book not found",
		})
	}
	return c.Status(fiber.StatusOK).JSON(books)
}