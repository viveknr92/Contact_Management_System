create database contact_manager;
use contact_manager;

create table contact
(
  contact_id int auto_increment,
  fname      varchar(20) not null,
  mname      varchar(20) null,
  lname      varchar(20) not null,
  constraint Contact_contact_id_uindex
  unique (contact_id)
);

create table address
(
  address_id   int auto_increment,
  contact_id   int          not null,
  address_type varchar(20)  null,
  address_line varchar(100) null,
  city         varchar(20)  null,
  state        varchar(20)  null,
  zip          varchar(6)   null,
  constraint address_address_id_uindex
  unique (address_id),
  constraint address_contact_contact_id_fk
  foreign key (contact_id) references contact (contact_id)
);

alter table address
  add primary key (address_id);

create table date
(
  date_id    int auto_increment,
  contact_id int         not null,
  date_type  varchar(20) null,
  date       date        null,
  constraint date_date_id_uindex
  unique (date_id),
  constraint date_contact_contact_id_fk
  foreign key (contact_id) references contact (contact_id)
);

alter table date
  add primary key (date_id);

create table phone
(
  phone_id   int auto_increment,
  contact_id int         not null,
  phone_type varchar(20) null,
  area_code  varchar(3)  null,
  number     varchar(8)  null,
  constraint phone_phone_id_uindex
  unique (phone_id),
  constraint phone_contact_contact_id_fk
  foreign key (contact_id) references contact (contact_id)
);

alter table phone
  add primary key (phone_id);


