
--Begin Connect--
\connect micado micado

begin;

CREATE TABLE "public"."address"
(
   address_id varchar(95) PRIMARY KEY NOT NULL,
   toponym varchar(200) NOT NULL,
   longitude float(19) NOT NULL,
   latitude float(19) NOT NULL
)
;

CREATE TABLE "public"."nationality"
(
   nationality_id varchar(95) PRIMARY KEY NOT NULL,
   nationality varchar(50)
)
;

CREATE TABLE "public"."migrant"
(
   migrant_id varchar(95) PRIMARY KEY NOT NULL,
   name varchar(200) NOT NULL,
   nationality_id varchar(95),
   birthday date NOT NULL
);

ALTER TABLE "public"."migrant"
ADD CONSTRAINT migrant_nationality_id_fkey
FOREIGN KEY (nationality_id)
REFERENCES "public"."nationality"(nationality_id)
;



CREATE TABLE "public"."migrant_address"
(
   migrant_id varchar(95) NOT NULL,
   address_id varchar(95) NOT NULL
)
;

CREATE TABLE "public"."courses"
(
   course_id int PRIMARY KEY NOT NULL,
   description text,
   facility_id int,
   organization_id int
)
;

--CREATE UNIQUE INDEX courses_pkey ON "public"."courses"(course_id)
--;

CREATE TABLE "public"."education_facility"
(
   facility_id int,
   address_id varchar(95),
   description varchar(50)
)
;



CREATE TABLE "public"."organization"
(
   organization_id int,
   description varchar(50)
)
;


INSERT INTO "public"."organization" (organization_id,description) VALUES (1,'Caritas');
INSERT INTO "public"."organization" (organization_id,description) VALUES (2,'Public School');


INSERT INTO "public"."education_facility" (facility_id,address_id,description) VALUES (1,'001','International school');


INSERT INTO "public"."courses" (course_id,description,facility_id,organization_id) VALUES (1,'english course',1,1);





INSERT INTO "public"."address" (address_id,toponym,longitude,latitude) VALUES ('001','Somewhere in TO',7.6764,45.0696);


CREATE VIEW "public"."courses_full"
 AS select c.*, f.description as facility, a.* from courses c, education_facility f, address a where c.facility_id=f.facility_id AND f.address_id=a.address_id;;


INSERT INTO "public"."nationality" (nationality_id,nationality) VALUES ('AGO','Angola');

INSERT INTO "public"."nationality" (nationality_id,nationality) VALUES ('CMR','Camerun');



INSERT INTO "public"."migrant" (migrant_id,name,nationality_id,birthday) VALUES ('001','migrant1','CMR', '1969-01-28');

INSERT INTO "public"."migrant" (migrant_id,name,nationality_id,birthday) VALUES ('002','migrant2','CMR', '1959-01-28');

INSERT INTO "public"."migrant" (migrant_id,name,nationality_id,birthday) VALUES ('003','migrant3','AGO', '1969-01-28');

INSERT INTO "public"."migrant" (migrant_id,name,nationality_id,birthday) VALUES ('004','migrant4','CMR','1949-01-28');

INSERT INTO "public"."migrant" (migrant_id,name,nationality_id,birthday) VALUES ('005','migrant5','CMR', '1999-01-28');



INSERT INTO "public"."migrant_address" (migrant_id,address_id) VALUES ('001','001');



CREATE TABLE "public"."world_countries"
(
   name text,
   alpha_2 text,
   alpha_3 text,
   country_code text,
   iso_3166_2 text,
   region text,
   sub_region text,
   intermediate_region text,
   region_code text,
   sub_region_code text,
   intermediate_region_code text
)
;



INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Afghanistan','AF','AFG','004','ISO 3166-2:AF','Asia','Southern Asia','','142','034','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Åland Islands','AX','ALA','248','ISO 3166-2:AX','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Albania','AL','ALB','008','ISO 3166-2:AL','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Algeria','DZ','DZA','012','ISO 3166-2:DZ','Africa','Northern Africa','','002','015','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('American Samoa','AS','ASM','016','ISO 3166-2:AS','Oceania','Polynesia','','009','061','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Andorra','AD','AND','020','ISO 3166-2:AD','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Angola','AO','AGO','024','ISO 3166-2:AO','Africa','Sub-Saharan Africa','Middle Africa','002','202','017');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Anguilla','AI','AIA','660','ISO 3166-2:AI','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Antarctica','AQ','ATA','010','ISO 3166-2:AQ','','','','','','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Antigua and Barbuda','AG','ATG','028','ISO 3166-2:AG','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Argentina','AR','ARG','032','ISO 3166-2:AR','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Armenia','AM','ARM','051','ISO 3166-2:AM','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Aruba','AW','ABW','533','ISO 3166-2:AW','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Australia','AU','AUS','036','ISO 3166-2:AU','Oceania','Australia and New Zealand','','009','053','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Austria','AT','AUT','040','ISO 3166-2:AT','Europe','Western Europe','','150','155','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Azerbaijan','AZ','AZE','031','ISO 3166-2:AZ','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Bahamas','BS','BHS','044','ISO 3166-2:BS','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Bahrain','BH','BHR','048','ISO 3166-2:BH','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Bangladesh','BD','BGD','050','ISO 3166-2:BD','Asia','Southern Asia','','142','034','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Barbados','BB','BRB','052','ISO 3166-2:BB','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Belarus','BY','BLR','112','ISO 3166-2:BY','Europe','Eastern Europe','','150','151','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Belgium','BE','BEL','056','ISO 3166-2:BE','Europe','Western Europe','','150','155','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Belize','BZ','BLZ','084','ISO 3166-2:BZ','Americas','Latin America and the Caribbean','Central America','019','419','013');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Benin','BJ','BEN','204','ISO 3166-2:BJ','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Bermuda','BM','BMU','060','ISO 3166-2:BM','Americas','Northern America','','019','021','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Bhutan','BT','BTN','064','ISO 3166-2:BT','Asia','Southern Asia','','142','034','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Bolivia (Plurinational State of)','BO','BOL','068','ISO 3166-2:BO','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Bonaire, Sint Eustatius and Saba','BQ','BES','535','ISO 3166-2:BQ','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Bosnia and Herzegovina','BA','BIH','070','ISO 3166-2:BA','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Botswana','BW','BWA','072','ISO 3166-2:BW','Africa','Sub-Saharan Africa','Southern Africa','002','202','018');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Bouvet Island','BV','BVT','074','ISO 3166-2:BV','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Brazil','BR','BRA','076','ISO 3166-2:BR','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('British Indian Ocean Territory','IO','IOT','086','ISO 3166-2:IO','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Brunei Darussalam','BN','BRN','096','ISO 3166-2:BN','Asia','South-eastern Asia','','142','035','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Bulgaria','BG','BGR','100','ISO 3166-2:BG','Europe','Eastern Europe','','150','151','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Burkina Faso','BF','BFA','854','ISO 3166-2:BF','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Burundi','BI','BDI','108','ISO 3166-2:BI','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Cabo Verde','CV','CPV','132','ISO 3166-2:CV','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Cambodia','KH','KHM','116','ISO 3166-2:KH','Asia','South-eastern Asia','','142','035','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Cameroon','CM','CMR','120','ISO 3166-2:CM','Africa','Sub-Saharan Africa','Middle Africa','002','202','017');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Canada','CA','CAN','124','ISO 3166-2:CA','Americas','Northern America','','019','021','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Cayman Islands','KY','CYM','136','ISO 3166-2:KY','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Central African Republic','CF','CAF','140','ISO 3166-2:CF','Africa','Sub-Saharan Africa','Middle Africa','002','202','017');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Chad','TD','TCD','148','ISO 3166-2:TD','Africa','Sub-Saharan Africa','Middle Africa','002','202','017');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Chile','CL','CHL','152','ISO 3166-2:CL','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('China','CN','CHN','156','ISO 3166-2:CN','Asia','Eastern Asia','','142','030','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Christmas Island','CX','CXR','162','ISO 3166-2:CX','Oceania','Australia and New Zealand','','009','053','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Cocos (Keeling) Islands','CC','CCK','166','ISO 3166-2:CC','Oceania','Australia and New Zealand','','009','053','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Colombia','CO','COL','170','ISO 3166-2:CO','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Comoros','KM','COM','174','ISO 3166-2:KM','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Congo','CG','COG','178','ISO 3166-2:CG','Africa','Sub-Saharan Africa','Middle Africa','002','202','017');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Congo (Democratic Republic of the)','CD','COD','180','ISO 3166-2:CD','Africa','Sub-Saharan Africa','Middle Africa','002','202','017');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Cook Islands','CK','COK','184','ISO 3166-2:CK','Oceania','Polynesia','','009','061','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Costa Rica','CR','CRI','188','ISO 3166-2:CR','Americas','Latin America and the Caribbean','Central America','019','419','013');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Côte d''Ivoire','CI','CIV','384','ISO 3166-2:CI','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Croatia','HR','HRV','191','ISO 3166-2:HR','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Cuba','CU','CUB','192','ISO 3166-2:CU','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Curaçao','CW','CUW','531','ISO 3166-2:CW','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Cyprus','CY','CYP','196','ISO 3166-2:CY','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Czechia','CZ','CZE','203','ISO 3166-2:CZ','Europe','Eastern Europe','','150','151','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Denmark','DK','DNK','208','ISO 3166-2:DK','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Djibouti','DJ','DJI','262','ISO 3166-2:DJ','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Dominica','DM','DMA','212','ISO 3166-2:DM','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Dominican Republic','DO','DOM','214','ISO 3166-2:DO','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Ecuador','EC','ECU','218','ISO 3166-2:EC','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Egypt','EG','EGY','818','ISO 3166-2:EG','Africa','Northern Africa','','002','015','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('El Salvador','SV','SLV','222','ISO 3166-2:SV','Americas','Latin America and the Caribbean','Central America','019','419','013');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Equatorial Guinea','GQ','GNQ','226','ISO 3166-2:GQ','Africa','Sub-Saharan Africa','Middle Africa','002','202','017');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Eritrea','ER','ERI','232','ISO 3166-2:ER','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Estonia','EE','EST','233','ISO 3166-2:EE','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Eswatini','SZ','SWZ','748','ISO 3166-2:SZ','Africa','Sub-Saharan Africa','Southern Africa','002','202','018');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Ethiopia','ET','ETH','231','ISO 3166-2:ET','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Falkland Islands (Malvinas)','FK','FLK','238','ISO 3166-2:FK','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Faroe Islands','FO','FRO','234','ISO 3166-2:FO','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Fiji','FJ','FJI','242','ISO 3166-2:FJ','Oceania','Melanesia','','009','054','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Finland','FI','FIN','246','ISO 3166-2:FI','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('France','FR','FRA','250','ISO 3166-2:FR','Europe','Western Europe','','150','155','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('French Guiana','GF','GUF','254','ISO 3166-2:GF','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('French Polynesia','PF','PYF','258','ISO 3166-2:PF','Oceania','Polynesia','','009','061','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('French Southern Territories','TF','ATF','260','ISO 3166-2:TF','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Gabon','GA','GAB','266','ISO 3166-2:GA','Africa','Sub-Saharan Africa','Middle Africa','002','202','017');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Gambia','GM','GMB','270','ISO 3166-2:GM','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Georgia','GE','GEO','268','ISO 3166-2:GE','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Germany','DE','DEU','276','ISO 3166-2:DE','Europe','Western Europe','','150','155','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Ghana','GH','GHA','288','ISO 3166-2:GH','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Gibraltar','GI','GIB','292','ISO 3166-2:GI','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Greece','GR','GRC','300','ISO 3166-2:GR','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Greenland','GL','GRL','304','ISO 3166-2:GL','Americas','Northern America','','019','021','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Grenada','GD','GRD','308','ISO 3166-2:GD','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Guadeloupe','GP','GLP','312','ISO 3166-2:GP','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Guam','GU','GUM','316','ISO 3166-2:GU','Oceania','Micronesia','','009','057','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Guatemala','GT','GTM','320','ISO 3166-2:GT','Americas','Latin America and the Caribbean','Central America','019','419','013');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Guernsey','GG','GGY','831','ISO 3166-2:GG','Europe','Northern Europe','Channel Islands','150','154','830');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Guinea','GN','GIN','324','ISO 3166-2:GN','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Guinea-Bissau','GW','GNB','624','ISO 3166-2:GW','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Guyana','GY','GUY','328','ISO 3166-2:GY','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Haiti','HT','HTI','332','ISO 3166-2:HT','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Heard Island and McDonald Islands','HM','HMD','334','ISO 3166-2:HM','Oceania','Australia and New Zealand','','009','053','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Holy See','VA','VAT','336','ISO 3166-2:VA','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Honduras','HN','HND','340','ISO 3166-2:HN','Americas','Latin America and the Caribbean','Central America','019','419','013');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Hong Kong','HK','HKG','344','ISO 3166-2:HK','Asia','Eastern Asia','','142','030','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Hungary','HU','HUN','348','ISO 3166-2:HU','Europe','Eastern Europe','','150','151','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Iceland','IS','ISL','352','ISO 3166-2:IS','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('India','IN','IND','356','ISO 3166-2:IN','Asia','Southern Asia','','142','034','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Indonesia','ID','IDN','360','ISO 3166-2:ID','Asia','South-eastern Asia','','142','035','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Iran (Islamic Republic of)','IR','IRN','364','ISO 3166-2:IR','Asia','Southern Asia','','142','034','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Iraq','IQ','IRQ','368','ISO 3166-2:IQ','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Ireland','IE','IRL','372','ISO 3166-2:IE','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Isle of Man','IM','IMN','833','ISO 3166-2:IM','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Israel','IL','ISR','376','ISO 3166-2:IL','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Italy','IT','ITA','380','ISO 3166-2:IT','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Jamaica','JM','JAM','388','ISO 3166-2:JM','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Japan','JP','JPN','392','ISO 3166-2:JP','Asia','Eastern Asia','','142','030','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Jersey','JE','JEY','832','ISO 3166-2:JE','Europe','Northern Europe','Channel Islands','150','154','830');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Jordan','JO','JOR','400','ISO 3166-2:JO','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Kazakhstan','KZ','KAZ','398','ISO 3166-2:KZ','Asia','Central Asia','','142','143','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Kenya','KE','KEN','404','ISO 3166-2:KE','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Kiribati','KI','KIR','296','ISO 3166-2:KI','Oceania','Micronesia','','009','057','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Korea (Democratic People''s Republic of)','KP','PRK','408','ISO 3166-2:KP','Asia','Eastern Asia','','142','030','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Korea (Republic of)','KR','KOR','410','ISO 3166-2:KR','Asia','Eastern Asia','','142','030','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Kuwait','KW','KWT','414','ISO 3166-2:KW','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Kyrgyzstan','KG','KGZ','417','ISO 3166-2:KG','Asia','Central Asia','','142','143','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Lao People''s Democratic Republic','LA','LAO','418','ISO 3166-2:LA','Asia','South-eastern Asia','','142','035','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Latvia','LV','LVA','428','ISO 3166-2:LV','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Lebanon','LB','LBN','422','ISO 3166-2:LB','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Lesotho','LS','LSO','426','ISO 3166-2:LS','Africa','Sub-Saharan Africa','Southern Africa','002','202','018');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Liberia','LR','LBR','430','ISO 3166-2:LR','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Libya','LY','LBY','434','ISO 3166-2:LY','Africa','Northern Africa','','002','015','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Liechtenstein','LI','LIE','438','ISO 3166-2:LI','Europe','Western Europe','','150','155','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Lithuania','LT','LTU','440','ISO 3166-2:LT','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Luxembourg','LU','LUX','442','ISO 3166-2:LU','Europe','Western Europe','','150','155','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Macao','MO','MAC','446','ISO 3166-2:MO','Asia','Eastern Asia','','142','030','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Macedonia (the former Yugoslav Republic of)','MK','MKD','807','ISO 3166-2:MK','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Madagascar','MG','MDG','450','ISO 3166-2:MG','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Malawi','MW','MWI','454','ISO 3166-2:MW','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Malaysia','MY','MYS','458','ISO 3166-2:MY','Asia','South-eastern Asia','','142','035','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Maldives','MV','MDV','462','ISO 3166-2:MV','Asia','Southern Asia','','142','034','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Mali','ML','MLI','466','ISO 3166-2:ML','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Malta','MT','MLT','470','ISO 3166-2:MT','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Marshall Islands','MH','MHL','584','ISO 3166-2:MH','Oceania','Micronesia','','009','057','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Martinique','MQ','MTQ','474','ISO 3166-2:MQ','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Mauritania','MR','MRT','478','ISO 3166-2:MR','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Mauritius','MU','MUS','480','ISO 3166-2:MU','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Mayotte','YT','MYT','175','ISO 3166-2:YT','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Mexico','MX','MEX','484','ISO 3166-2:MX','Americas','Latin America and the Caribbean','Central America','019','419','013');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Micronesia (Federated States of)','FM','FSM','583','ISO 3166-2:FM','Oceania','Micronesia','','009','057','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Moldova (Republic of)','MD','MDA','498','ISO 3166-2:MD','Europe','Eastern Europe','','150','151','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Monaco','MC','MCO','492','ISO 3166-2:MC','Europe','Western Europe','','150','155','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Mongolia','MN','MNG','496','ISO 3166-2:MN','Asia','Eastern Asia','','142','030','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Montenegro','ME','MNE','499','ISO 3166-2:ME','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Montserrat','MS','MSR','500','ISO 3166-2:MS','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Morocco','MA','MAR','504','ISO 3166-2:MA','Africa','Northern Africa','','002','015','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Mozambique','MZ','MOZ','508','ISO 3166-2:MZ','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Myanmar','MM','MMR','104','ISO 3166-2:MM','Asia','South-eastern Asia','','142','035','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Namibia','NA','NAM','516','ISO 3166-2:NA','Africa','Sub-Saharan Africa','Southern Africa','002','202','018');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Nauru','NR','NRU','520','ISO 3166-2:NR','Oceania','Micronesia','','009','057','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Nepal','NP','NPL','524','ISO 3166-2:NP','Asia','Southern Asia','','142','034','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Netherlands','NL','NLD','528','ISO 3166-2:NL','Europe','Western Europe','','150','155','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('New Caledonia','NC','NCL','540','ISO 3166-2:NC','Oceania','Melanesia','','009','054','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('New Zealand','NZ','NZL','554','ISO 3166-2:NZ','Oceania','Australia and New Zealand','','009','053','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Nicaragua','NI','NIC','558','ISO 3166-2:NI','Americas','Latin America and the Caribbean','Central America','019','419','013');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Niger','NE','NER','562','ISO 3166-2:NE','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Nigeria','NG','NGA','566','ISO 3166-2:NG','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Niue','NU','NIU','570','ISO 3166-2:NU','Oceania','Polynesia','','009','061','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Norfolk Island','NF','NFK','574','ISO 3166-2:NF','Oceania','Australia and New Zealand','','009','053','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Northern Mariana Islands','MP','MNP','580','ISO 3166-2:MP','Oceania','Micronesia','','009','057','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Norway','NO','NOR','578','ISO 3166-2:NO','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Oman','OM','OMN','512','ISO 3166-2:OM','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Pakistan','PK','PAK','586','ISO 3166-2:PK','Asia','Southern Asia','','142','034','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Palau','PW','PLW','585','ISO 3166-2:PW','Oceania','Micronesia','','009','057','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Palestine, State of','PS','PSE','275','ISO 3166-2:PS','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Panama','PA','PAN','591','ISO 3166-2:PA','Americas','Latin America and the Caribbean','Central America','019','419','013');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Papua New Guinea','PG','PNG','598','ISO 3166-2:PG','Oceania','Melanesia','','009','054','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Paraguay','PY','PRY','600','ISO 3166-2:PY','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Peru','PE','PER','604','ISO 3166-2:PE','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Philippines','PH','PHL','608','ISO 3166-2:PH','Asia','South-eastern Asia','','142','035','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Pitcairn','PN','PCN','612','ISO 3166-2:PN','Oceania','Polynesia','','009','061','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Poland','PL','POL','616','ISO 3166-2:PL','Europe','Eastern Europe','','150','151','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Portugal','PT','PRT','620','ISO 3166-2:PT','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Puerto Rico','PR','PRI','630','ISO 3166-2:PR','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Qatar','QA','QAT','634','ISO 3166-2:QA','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Réunion','RE','REU','638','ISO 3166-2:RE','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Romania','RO','ROU','642','ISO 3166-2:RO','Europe','Eastern Europe','','150','151','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Russian Federation','RU','RUS','643','ISO 3166-2:RU','Europe','Eastern Europe','','150','151','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Rwanda','RW','RWA','646','ISO 3166-2:RW','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Saint Barthélemy','BL','BLM','652','ISO 3166-2:BL','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Saint Helena, Ascension and Tristan da Cunha','SH','SHN','654','ISO 3166-2:SH','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Saint Kitts and Nevis','KN','KNA','659','ISO 3166-2:KN','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Saint Lucia','LC','LCA','662','ISO 3166-2:LC','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Saint Martin (French part)','MF','MAF','663','ISO 3166-2:MF','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Saint Pierre and Miquelon','PM','SPM','666','ISO 3166-2:PM','Americas','Northern America','','019','021','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Saint Vincent and the Grenadines','VC','VCT','670','ISO 3166-2:VC','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Samoa','WS','WSM','882','ISO 3166-2:WS','Oceania','Polynesia','','009','061','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('San Marino','SM','SMR','674','ISO 3166-2:SM','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Sao Tome and Principe','ST','STP','678','ISO 3166-2:ST','Africa','Sub-Saharan Africa','Middle Africa','002','202','017');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Saudi Arabia','SA','SAU','682','ISO 3166-2:SA','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Senegal','SN','SEN','686','ISO 3166-2:SN','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Serbia','RS','SRB','688','ISO 3166-2:RS','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Seychelles','SC','SYC','690','ISO 3166-2:SC','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Sierra Leone','SL','SLE','694','ISO 3166-2:SL','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Singapore','SG','SGP','702','ISO 3166-2:SG','Asia','South-eastern Asia','','142','035','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Sint Maarten (Dutch part)','SX','SXM','534','ISO 3166-2:SX','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Slovakia','SK','SVK','703','ISO 3166-2:SK','Europe','Eastern Europe','','150','151','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Slovenia','SI','SVN','705','ISO 3166-2:SI','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Solomon Islands','SB','SLB','090','ISO 3166-2:SB','Oceania','Melanesia','','009','054','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Somalia','SO','SOM','706','ISO 3166-2:SO','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('South Africa','ZA','ZAF','710','ISO 3166-2:ZA','Africa','Sub-Saharan Africa','Southern Africa','002','202','018');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('South Georgia and the South Sandwich Islands','GS','SGS','239','ISO 3166-2:GS','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('South Sudan','SS','SSD','728','ISO 3166-2:SS','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Spain','ES','ESP','724','ISO 3166-2:ES','Europe','Southern Europe','','150','039','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Sri Lanka','LK','LKA','144','ISO 3166-2:LK','Asia','Southern Asia','','142','034','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Sudan','SD','SDN','729','ISO 3166-2:SD','Africa','Northern Africa','','002','015','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Suriname','SR','SUR','740','ISO 3166-2:SR','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Svalbard and Jan Mayen','SJ','SJM','744','ISO 3166-2:SJ','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Sweden','SE','SWE','752','ISO 3166-2:SE','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Switzerland','CH','CHE','756','ISO 3166-2:CH','Europe','Western Europe','','150','155','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Syrian Arab Republic','SY','SYR','760','ISO 3166-2:SY','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Taiwan, Province of China','TW','TWN','158','ISO 3166-2:TW','Asia','Eastern Asia','','142','030','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Tajikistan','TJ','TJK','762','ISO 3166-2:TJ','Asia','Central Asia','','142','143','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Tanzania, United Republic of','TZ','TZA','834','ISO 3166-2:TZ','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Thailand','TH','THA','764','ISO 3166-2:TH','Asia','South-eastern Asia','','142','035','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Timor-Leste','TL','TLS','626','ISO 3166-2:TL','Asia','South-eastern Asia','','142','035','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Togo','TG','TGO','768','ISO 3166-2:TG','Africa','Sub-Saharan Africa','Western Africa','002','202','011');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Tokelau','TK','TKL','772','ISO 3166-2:TK','Oceania','Polynesia','','009','061','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Tonga','TO','TON','776','ISO 3166-2:TO','Oceania','Polynesia','','009','061','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Trinidad and Tobago','TT','TTO','780','ISO 3166-2:TT','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Tunisia','TN','TUN','788','ISO 3166-2:TN','Africa','Northern Africa','','002','015','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Turkey','TR','TUR','792','ISO 3166-2:TR','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Turkmenistan','TM','TKM','795','ISO 3166-2:TM','Asia','Central Asia','','142','143','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Turks and Caicos Islands','TC','TCA','796','ISO 3166-2:TC','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Tuvalu','TV','TUV','798','ISO 3166-2:TV','Oceania','Polynesia','','009','061','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Uganda','UG','UGA','800','ISO 3166-2:UG','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Ukraine','UA','UKR','804','ISO 3166-2:UA','Europe','Eastern Europe','','150','151','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('United Arab Emirates','AE','ARE','784','ISO 3166-2:AE','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('United Kingdom of Great Britain and Northern Ireland','GB','GBR','826','ISO 3166-2:GB','Europe','Northern Europe','','150','154','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('United States Minor Outlying Islands','UM','UMI','581','ISO 3166-2:UM','Oceania','Micronesia','','009','057','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('United States of America','US','USA','840','ISO 3166-2:US','Americas','Northern America','','019','021','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Uruguay','UY','URY','858','ISO 3166-2:UY','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Uzbekistan','UZ','UZB','860','ISO 3166-2:UZ','Asia','Central Asia','','142','143','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Vanuatu','VU','VUT','548','ISO 3166-2:VU','Oceania','Melanesia','','009','054','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Venezuela (Bolivarian Republic of)','VE','VEN','862','ISO 3166-2:VE','Americas','Latin America and the Caribbean','South America','019','419','005');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Viet Nam','VN','VNM','704','ISO 3166-2:VN','Asia','South-eastern Asia','','142','035','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Virgin Islands (British)','VG','VGB','092','ISO 3166-2:VG','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Virgin Islands (U.S.)','VI','VIR','850','ISO 3166-2:VI','Americas','Latin America and the Caribbean','Caribbean','019','419','029');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Wallis and Futuna','WF','WLF','876','ISO 3166-2:WF','Oceania','Polynesia','','009','061','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Western Sahara','EH','ESH','732','ISO 3166-2:EH','Africa','Northern Africa','','002','015','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Yemen','YE','YEM','887','ISO 3166-2:YE','Asia','Western Asia','','142','145','');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Zambia','ZM','ZMB','894','ISO 3166-2:ZM','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');
INSERT INTO "public"."world_countries" (name,alpha_2,alpha_3,country_code,iso_3166_2,region,sub_region,intermediate_region,region_code,sub_region_code,intermediate_region_code) VALUES ('Zimbabwe','ZW','ZWE','716','ISO 3166-2:ZW','Africa','Sub-Saharan Africa','Eastern Africa','002','202','014');


CREATE TABLE "public"."migration"
(
   co2 text,
   country_of_birth_nationality text,
   var text,
   variable text,
   gen text,
   gender text,
   cou text,
   country text,
   yea text,
   year text,
   value text,
   flag_codes text,
   flags text
)
;



commit;
--End Connect--
