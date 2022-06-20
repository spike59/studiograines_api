
ALTER TABLE `user_account` CHANGE `user_account_id` `id` INT(11) NOT NULL AUTO_INCREMENT;

INSERT INTO `account_type` (`Id_account_type`, `provider`) VALUES ('0', 'studiograines.local');

INSERT INTO `user_account` (`id`, `email`, `password`, `is_active`, `role`, `Id_account_type`) VALUES (NULL, 'user@user.fr', 'bwiroDNWa6lCfoQaAqPJ3urOA6sAldXWxVl7A3Zx4O5bxF/dID1XK', '1', 'Admin', '1');