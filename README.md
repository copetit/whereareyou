<div align="center">
  <h1>Where Are You</h1>
<img src="/readme-img/logo.png" width="150" >
  <p>Posting your lost Pet info. </p>
  <p>Checking lost Pet on google map.</p>
</div>

## Tech Stack

**Client:** React, Tailwind CSS

**Server:** NestJS, TypeORM

**DB:** MySQL


## Page Description

### Main

You can check pet's information and location where lost on google map.

<img src="/readme-img/main.png" width="550" >

### Posting

You can post information about your missing pet.

<img src="/readme-img/posting.png" width="550" >

### About

<img src="/readme-img/about.png" width="550" >

## Installation and Usage

```bash
$ code whereareyou
$ cp frontend/.env.sample frontend/.env.local

# ADD Google Maps JavaScript API key in '.env.local' file.

# Docker start
$ docker-compose build
$ docker-compose up -d

```

### URL

| WAU App | http://localhost:3000/wau  |         |
| ------- | -------------------------- | ------- |
| Swagger | http://localhost:4000/doc  | API Doc |

## Contributer

[@copetit](https://github.com/copetit) and [@shhwan](https://github.com/shhwan)

## License

MIT
