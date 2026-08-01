function getMemberFineStatistics(members, books, borrowRecords) {
  const result = members
    .map((member) => {
      // Lấy các borrowRecord của member
      const memberRecords = borrowRecords.filter((record) => {
        return (
          record.memberId === member.id &&
          Object.hasOwn(record, "lines") // Chỉ xử lý nếu lines là thuộc tính riêng
        );
      });

      // Gom tất cả lines
      const allLines = memberRecords.flatMap((record) => record.lines);

      // Gom các sách trùng nhau
      const groupedBooks = {};

      for (const line of allLines) {
        const book = books.find((b) => b.id === line.bookId);

        if (!book) continue;

        if (!groupedBooks[line.bookId]) {
          groupedBooks[line.bookId] = {
            title: book.title,
            lateDays: line.lateDays,
            fine: line.lateDays * book.finePerDay,
          };
        } else {
          groupedBooks[line.bookId].lateDays += line.lateDays;
          groupedBooks[line.bookId].fine +=
            line.lateDays * book.finePerDay;
        }
      }

      const bookList = Object.values(groupedBooks);

      // Sắp xếp sách
      bookList.sort((a, b) => b.fine - a.fine);

      // Tổng tiền phạt
      const totalFine = bookList.reduce(
        (sum, book) => sum + book.fine,
        0
      );

      return {
        id: member.id,
        name: member.name,
        totalFine,
        books: bookList,
      };
    })
    .sort((a, b) => b.totalFine - a.totalFine);

  // Freeze từng member
  for (const member of result) {
    Object.freeze(member);
  }

  // Freeze mảng kết quả
  Object.freeze(result);

  return result;
}