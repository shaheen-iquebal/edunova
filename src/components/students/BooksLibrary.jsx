import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Download, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const BooksLibrary = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample books data - in production, this would come from the API
  useEffect(() => {
    const sampleBooks = [
      {
        id: 1,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        cover_id: "6437177",
        description:
          "A classic novel of manners, marriage, and romance in Georgian England.",
        type: "literature",
      },
      {
        id: 2,
        title: "Campbell Biology (12th Edition)",
        author: "Lisa A. Urry, Michael L. Cain",
        cover_id: "10736567",
        description:
          "Comprehensive biology textbook covering molecular and cellular biology, genetics, evolution, and ecology.",
        type: "textbook",
      },
      {
        id: 3,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        cover_id: "7364889",
        description:
          "A powerful story of racial injustice and childhood innocence in the American South.",
        type: "literature",
      },
      {
        id: 4,
        title: "Chemistry: The Central Science",
        author: "Theodore E. Brown, H. Eugene LeMay",
        cover_id: "12700771",
        description:
          "Essential chemistry concepts from atomic structure to chemical reactions and bonding.",
        type: "textbook",
      },
      {
        id: 5,
        title: "1984",
        author: "George Orwell",
        cover_id: "7222246",
        description:
          "A dystopian novel about surveillance, control, and the power of truth.",
        type: "literature",
      },
      {
        id: 6,
        title: "Calculus: Early Transcendentals",
        author: "James Stewart",
        cover_id: "12591096",
        description:
          "Comprehensive calculus textbook covering limits, derivatives, integrals, and series.",
        type: "textbook",
      },
      {
        id: 7,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        cover_id: "10482898",
        description:
          "A tale of wealth, love, and the American Dream in the Roaring Twenties.",
        type: "literature",
      },
      {
        id: 8,
        title: "Physics for Scientists and Engineers",
        author: "Raymond A. Serway, John W. Jewett",
        cover_id: "12638578",
        description:
          "Comprehensive physics textbook covering mechanics, waves, thermodynamics, and modern physics.",
        type: "textbook",
      },
      {
        id: 9,
        title: "Lord of the Flies",
        author: "William Golding",
        cover_id: "8231999",
        description:
          "A story of young boys stranded on an island and their descent into savagery.",
        type: "literature",
      },
      {
        id: 10,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen, Charles E. Leiserson",
        cover_id: "9278724",
        description:
          "Comprehensive coverage of computer algorithms and their analysis.",
        type: "textbook",
      },
      {
        id: 11,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        cover_id: "7189052",
        description:
          "A coming-of-age story following Holden Caulfield's journey through New York City.",
        type: "literature",
      },
      {
        id: 12,
        title: "World History: Patterns of Interaction",
        author: "Roger B. Beck, Linda Black",
        cover_id: "11389453",
        description:
          "Comprehensive world history textbook from ancient civilizations to modern times.",
        type: "textbook",
      },
      {
        id: 13,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        cover_id: "6979861",
        description:
          "A fantasy novel following Bilbo Baggins on an epic quest across Middle-earth.",
        type: "literature",
      },
      {
        id: 14,
        title: "Psychology: Themes and Variations",
        author: "Wayne Weiten",
        cover_id: "12687432",
        description:
          "Comprehensive introduction to psychology covering behavior, cognition, and development.",
        type: "textbook",
      },
      {
        id: 15,
        title: "Animal Farm",
        author: "George Orwell",
        cover_id: "7410750",
        description:
          "An allegorical novella about the Soviet Union using farm animals as characters.",
        type: "literature",
      },
      {
        id: 16,
        title: "Economics: Principles and Policy",
        author: "William J. Baumol, Alan S. Blinder",
        cover_id: "12452867",
        description:
          "Comprehensive economics textbook covering micro and macroeconomic principles.",
        type: "textbook",
      },
      {
        id: 17,
        title: "Environmental Science: Earth as a Living Planet",
        author: "Daniel B. Botkin, Edward A. Keller",
        cover_id: "12789654",
        description:
          "Explores environmental systems, human impacts, and sustainability solutions.",
        type: "textbook",
      },
    ];

    setBooks(sampleBooks);
    setLoading(false);
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Book className="h-8 w-8" />
          Student Library
        </h1>
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search books..."
            className="w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading books...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                <p className="text-sm text-gray-500">{book.author}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="aspect-[2/3] relative mb-4">
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {book.description}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read Online
                </Button>
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksLibrary;
