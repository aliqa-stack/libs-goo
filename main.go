package main

import(
	"fmt"
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Book struct {
	ID     string `json:"id,omitempty" bson:"_id,omitempty"`
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

	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}
		
		bookCollection = client.Database("bookstore").Collection("books")
}

func main(){
   app := fiber.New()

   app.Get("/book/:id", libsGet)
   app.Post("/book", libsPost)
   app.Put("/book/:id", libsPut)
   //app.Delete("/book:id", libsDelete)

   log.Fatal(app.Listen(":3000"))
   log.Println("Server running on port 3000")
} 

func libsPost(c *fiber.Ctx) error {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := connectDB()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to connect to database",
		})
	}

	var books []Book

	if err := c.BodyParser(&books); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to parse request body",
		})
	}

	newBook := Book{
		ID: primitive.NewObjectID().Hex(),
		Title: books.Title,
		Author: books.Author,
	}

	result, err := bookCollection.InsertOne(ctx, newBook)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to insert book into database",
		})
	}

	return c.Status(http.StatusCreated).JSON(result)
     

}

func libsGet(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()                                                          	
	
	client, err := connectDB()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to connect to database",
		})
	}

	var books []Book
	userId, _ := c.Params("id")
	objId := primitive.ObjectIDFromHex(userId)
	err := bookCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&books)
	if err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{
			"error": "Book not found",
		})
	}
	return c.Status(fiber.StatusOK).JSON(books)
}

func libsPut(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := connectDB()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to connect to database",
		})
	}

	var updateBooks []Book
	userId, _ := c.Params("id")
	objId := primitive.ObjectIDFromHex(userId)
	if err := c.BodyParser(&books); err != nil {
		return c.Status(http.StatusBadRequest)
	}

	filter := bson.M{"_id", objId}
	update := bson.M{
		"$set": bson.M {
			"Title" : updateBooks.Title,
			"Author": updateBooks.Author,
		},
	}

	result, err := bookCollection.updateOne(ctx, filter, update)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"cant update books",
		})
	}

	return c.Status(http.StatusOk).JSON(fiber.Map{
			"cant update books",
	})

}