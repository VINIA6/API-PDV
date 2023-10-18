create database pdv;

create table usuarios(
 id SERIAL PRIMARY KEY,
 nome varchar(255) not null,
 email varchar(255) not null unique,
 senha varchar(255) not null
 );

create table categorias(
 id SERIAL PRIMARY KEY,
 descricao varchar(255)
 );

insert into categorias (descricao) values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

create table produtos(
 id SERIAL PRIMARY KEY,
 descricao varchar(255) not null,
 quantidade_estoque int not null,
 valor int not null,
 categoria_id int REFERENCES categorias (id)
);

create table clientes(
 id SERIAL PRIMARY KEY,
 nome varchar(255) not null,
 email varchar(255) not null unique,
 cpf varchar(11) not null unique,
 cep varchar(8),
 rua varchar(255),
 numero int,
 bairro varchar(100),
 cidade varchar(100),
 estado char(2)
);

create table pedidos(
 id SERIAL PRIMARY KEY,
 observacao varchar(255),
 valor_total int not null,
 cliente_id int REFERENCES clientes (id)
);

create table pedido_produtos(
 id SERIAL PRIMARY KEY,
 quantidade_produto int not null,
 valor_produto int not null,
 pedido_id int REFERENCES pedidos (id),
 produto_id int REFERENCES produtos (id)
);

ALTER TABLE produtos add produto_imagem text;