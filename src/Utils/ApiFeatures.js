export class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  // Pagination
  paginate() {
    let CurrentPage = this.queryString.page * 1 || 1;
    if (this.queryString.page <= 0) CurrentPage = 1;
    let skip = (CurrentPage - 1) * 5;
    this.CurrentPage = CurrentPage;
    this.mongooseQuery.skip(skip).limit(5);
    return this;
  }

  // Filter
  filter() {
    let filterObj = { ...this.queryString };
    let excludeQuery = ["page", "sort", "fields", "keyword"];
    excludeQuery.forEach((q) => {
      delete filterObj[q];
    });
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(
      /\b(gt|gte|lte|lt)\b/g,
      (match) => `$${match}`
    );
    filterObj = JSON.parse(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }

  // Sort
  sort() {
    if (this.queryString.sort) {
      let sortedBy = this.queryString.sort.split(",").join(" ");
      mongooseQuery.sort(sortedBy);
      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }

  // Search
  search() {
    if (this.queryString.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  // Selected Fields
  selectedFields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
}
