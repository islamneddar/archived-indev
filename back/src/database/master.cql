CREATE TABLE `blogs`
(
    `blog_id`        int          NOT NULL AUTO_INCREMENT,
    `title`          varchar(255) NOT NULL,
    `thumbnail`      varchar(255) NOT NULL,
    `permalink`      varchar(255) NOT NULL,
    `source_blog_id` int                   DEFAULT NULL,
    `delete_date`    datetime(6)           DEFAULT NULL,
    `creation_at`    datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at`      datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `publish_date`   datetime     NOT NULL,
    PRIMARY KEY (`blog_id`),
    UNIQUE KEY `IDX_b9e1eb8aea30ea2192cd8f0a31` (`title`),
    KEY `FK_af023047886653e6cc2d914012e` (`source_blog_id`),
    CONSTRAINT `FK_af023047886653e6cc2d914012e` FOREIGN KEY (`source_blog_id`) REFERENCES `source_blogs` (`source_blog_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 21
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `tags`
(
    `tag_id` int          NOT NULL AUTO_INCREMENT,
    `title`  varchar(255) NOT NULL,
    PRIMARY KEY (`tag_id`),
    UNIQUE KEY `IDX_25cae3ff755adc0abe5ca28409` (`title`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 28
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;


CREATE TABLE `blogs_tags_tags`
(
    `blogsBlogId` int NOT NULL,
    `tagsTagId`   int NOT NULL,
    PRIMARY KEY (`blogsBlogId`, `tagsTagId`),
    KEY `IDX_4b14fbd583891282c8ecc0b534` (`blogsBlogId`),
    KEY `IDX_ce37a1accb71afcabd1325b754` (`tagsTagId`),
    CONSTRAINT `FK_4b14fbd583891282c8ecc0b5348` FOREIGN KEY (`blogsBlogId`) REFERENCES `blogs` (`blog_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_ce37a1accb71afcabd1325b7541` FOREIGN KEY (`tagsTagId`) REFERENCES `tags` (`tag_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `feed_blogs`
(
    `feed_blog_id`   int          NOT NULL AUTO_INCREMENT,
    `delete_date`    datetime(6)           DEFAULT NULL,
    `creation_at`    datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at`      datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `source_blog_id` int                   DEFAULT NULL,
    `url_feed`       varchar(255) NOT NULL,
    PRIMARY KEY (`feed_blog_id`),
    UNIQUE KEY `IDX_80e57959973b88ddfd3e2beb3b` (`url_feed`),
    UNIQUE KEY `REL_06bbb16a5e5e3d0865ed3cb0b6` (`source_blog_id`),
    CONSTRAINT `FK_06bbb16a5e5e3d0865ed3cb0b60` FOREIGN KEY (`source_blog_id`) REFERENCES `source_blogs` (`source_blog_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `source_blogs`
(
    `source_blog_id` int          NOT NULL AUTO_INCREMENT,
    `name`           varchar(255) NOT NULL,
    `image`          varchar(255) NOT NULL,
    `delete_date`    datetime(6)           DEFAULT NULL,
    `creation_at`    datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at`      datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`source_blog_id`),
    UNIQUE KEY `IDX_100b52f04e16d79165efd213b5` (`name`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 5
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci






