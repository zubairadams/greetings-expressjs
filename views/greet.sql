drop table if exists usersGreeted;
create table usersGreeted(
	id serial not null primary key,
	Username text not null,
    counter int default 0
)