CREATE TABLE [dbo].[Articles]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] VARCHAR(100) NOT NULL, 
    [Description] TEXT NOT NULL, 
    [Price] DECIMAL(18, 3) NOT NULL, 
    [Total_In_Shelf] INT NOT NULL DEFAULT 0, 
    [Total_In_Vault] INT NOT NULL DEFAULT 0, 
    [StoreId] INT NOT NULL, 
    CONSTRAINT [FK_Articles_Stores] FOREIGN KEY (StoreId) REFERENCES [Stores]([Id]) 
)
