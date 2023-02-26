import { BookInfo, BookStatus, Role } from "@prisma/client";
import { HttpError } from "../types/custom.error";
import prisma from "../database/client";

class BookInfoService {
  /**
   * It adds a new book
   * @param {BookInfo} bookInfo - The book data
   * @returns A promise
   */
  async addBook(bookInfo: BookInfo) {
    return await prisma.bookInfo.create({ data: bookInfo });
  }
  /**
   * It changes the book status
   * @param {number} bookId - The book id
   * @param {string} status - The book status
   * @returns A promise
   */
  async changeBookStatus(bookId: number, status: BookStatus) {
    return await prisma.bookInfo.update({
      where: {
        id: bookId,
      },
      data: {
        status,
      },
    });
  }
  /**
   * It updates an existing book information
   * @param {BookInfo} bookInfo - The book to update
   * @param {number} bookId - The book id
   * @returns A promise
   */
  async updateBook(bookInfo: BookInfo, bookId: number) {
    return await prisma.bookInfo.update({
      where: {
        id: bookId,
      },
      data: bookInfo,
    });
  }
  /**
   * It deletes a book, only if the user is an admin
   * @param {number} bookId - The book id
   * @param {Role} role - The user role
   * @returns A promise
   */
  async deleteBook(bookId: number, role: Role) {
    if (role === "ADMIN") {
      return await prisma.bookInfo.delete({
        where: {
          id: bookId,
        },
      });
    } else {
      throw new HttpError("You don't have permission to delete a book", 403);
    }
  }
  /**
   * It gets a book by its code
   * @param {string} code - The book code
   * @returns A promise
   */
  async getBookByCode(code: string) {
    return await prisma.bookInfo.findUnique({ where: { code }, });
  }
  /**
   * It gets all books
   * @param {number} size - The number of books to return
   * @param {number} page - The page number
   */
  async getBooks(size: number, page: number) {
    return await prisma.bookInfo.findMany({
      take: size,
      skip: (page - 1) * size,
    });
  }
}

export default new BookInfoService();