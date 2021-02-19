# filter-queries
A middleware for Express that makes it easier to check URL-queries. This is done by filtering out empty query strings and sending a 400 Bad Request (or optionally, something else) in the absence of any required query keys specified.
