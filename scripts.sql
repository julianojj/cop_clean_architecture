CREATE TABLE Customers(
  Id VARCHAR(36) PRIMARY KEY,
  Name VARCHAR(60) NOT NULL,
  Email VARCHAR(60) UNIQUE NOT NULL,
  Created DATETIME DEFAULT CURRENT_TIMESTAMP,
  Updated DATETIME DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE Items(
  Id VARCHAR(36) PRIMARY KEY,
  Name VARCHAR(60) UNIQUE NOT NULL,
  Price FLOAT NOT NULL,
  Created DATETIME DEFAULT CURRENT_TIMESTAMP,
  Updated DATETIME DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE Orders(
  Id VARCHAR(36) PRIMARY KEY,
  CustomerId VARCHAR(36) NOT NULL,
  FOREIGN KEY (CustomerId)
  REFERENCES Customers(Id),
  Total FLOAT NOT NULL,
  Created DATETIME DEFAULT CURRENT_TIMESTAMP,
  Updated DATETIME DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE OrderItems(
  OrderId VARCHAR(36) NOT NULL,
  FOREIGN KEY (OrderId)
  REFERENCES Orders(Id),
  ItemId VARCHAR(36) NOT NULL,
  FOREIGN KEY (ItemId)
  REFERENCES Items(Id),
  Quantity INT NOT NULL,
  Created DATETIME DEFAULT CURRENT_TIMESTAMP,
  Updated DATETIME DEFAULT CURRENT_TIMESTAMP
)
