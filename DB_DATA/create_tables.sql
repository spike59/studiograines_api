CREATE TABLE game(
   game_id INT AUTO_INCREMENT,
   code_name VARCHAR(50),
   name VARCHAR(50),
   PRIMARY KEY(game_id)
);

CREATE TABLE version(
   Id_version INT AUTO_INCREMENT,
   state VARCHAR(50),
   major VARCHAR(50),
   minor VARCHAR(50),
   correction VARCHAR(50),
   build VARCHAR(50),
   dev_date DATE,
   game_id INT NOT NULL,
   PRIMARY KEY(Id_version),
   FOREIGN KEY(game_id) REFERENCES game(game_id)
);

CREATE TABLE game_category(
   game_category_id INT AUTO_INCREMENT,
   name VARCHAR(50),
   game_category_id_parent INT NOT NULL,
   PRIMARY KEY(game_category_id),
   FOREIGN KEY(game_category_id_parent) REFERENCES game_category(game_category_id)
);

CREATE TABLE game_item(
   Id_game_item INT AUTO_INCREMENT,
   start_version VARCHAR(50),
   game_category_id INT NOT NULL,
   PRIMARY KEY(Id_game_item),
   FOREIGN KEY(game_category_id) REFERENCES game_category(game_category_id)
);

CREATE TABLE game_item_data(
   Id_data INT AUTO_INCREMENT,
   name VARCHAR(50),
   structure_files VARCHAR(50),
   data_files VARCHAR(50),
   PRIMARY KEY(Id_data)
);

CREATE TABLE account_type(
   Id_account_type INT AUTO_INCREMENT,
   provider VARCHAR(50),
   PRIMARY KEY(Id_account_type)
);

CREATE TABLE player_account(
   player_id INT AUTO_INCREMENT,
   fullname VARCHAR(255),
   game_id INT NOT NULL,
   PRIMARY KEY(player_id),
   FOREIGN KEY(game_id) REFERENCES game(game_id)
);

CREATE TABLE user_account(
   appuser_id INT AUTO_INCREMENT,
   email VARCHAR(255),
   password VARCHAR(50),
   is_active VARCHAR(50),
   role VARCHAR(50),
   Id_account_type INT NOT NULL,
   player_id INT NOT NULL,
   PRIMARY KEY(appuser_id, email),
   FOREIGN KEY(Id_account_type) REFERENCES account_type(Id_account_type),
   FOREIGN KEY(player_id) REFERENCES player_account(player_id)
);

CREATE TABLE report(
   report_id INT AUTO_INCREMENT,
   send_date DATE,
   Id_version INT NOT NULL,
   PRIMARY KEY(report_id),
   FOREIGN KEY(Id_version) REFERENCES version(Id_version)
);

CREATE TABLE report_item(
   Id_report_item INT AUTO_INCREMENT,
   content_type VARCHAR(50),
   content VARCHAR(50),
   severity VARCHAR(50),
   closed VARCHAR(50),
   game_category_id INT NOT NULL,
   report_id INT NOT NULL,
   PRIMARY KEY(Id_report_item),
   FOREIGN KEY(game_category_id) REFERENCES game_category(game_category_id),
   FOREIGN KEY(report_id) REFERENCES report(report_id)
);

CREATE TABLE game_item_datas(
   Id_game_item INT,
   Id_data INT,
   PRIMARY KEY(Id_game_item, Id_data),
   FOREIGN KEY(Id_game_item) REFERENCES game_item(Id_game_item),
   FOREIGN KEY(Id_data) REFERENCES game_item_data(Id_data)
);

CREATE TABLE version_game_items(
   Id_version INT,
   Id_game_item INT,
   PRIMARY KEY(Id_version, Id_game_item),
   FOREIGN KEY(Id_version) REFERENCES version(Id_version),
   FOREIGN KEY(Id_game_item) REFERENCES game_item(Id_game_item)
);
