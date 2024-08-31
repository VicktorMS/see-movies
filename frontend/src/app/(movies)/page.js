"use client";

import React, { useEffect, useState } from "react";
import Title from "@/app/ui/title";
import MovieList from "../ui/movies/movie-list";

export default function Home() {
  const [message, setMessage] = useState("");

  const mock_movies = [
    {
      "adult": false,
      "backdrop_path": "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
      "genre_ids": [
        53,
        80
      ],
      "id": 680,
      "original_language": "en",
      "original_title": "Pulp Fiction",
      "overview": "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
      "popularity": 125.457,
      "poster_path": "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      "release_date": "1994-09-10",
      "title": "Pulp Fiction",
      "video": false,
      "vote_average": 8.488,
      "vote_count": 27565
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        99
      ],
      "id": 295641,
      "original_language": "en",
      "original_title": "Pulp Fiction: The Golden Age of Storytelling",
      "overview": "This program profiles writers of the 20s, 30s, and 40s--known as the Pulp Fiction era. These writers created the iconic movies and characters who live on today in our collective hearts and imaginations. It has even been estimated that 90-95% of the top blockbusters in Hollywood movies were based on stories from the Pulp Fiction era.",
      "popularity": 0.77,
      "poster_path": "/x7siHmBxskdiL8Z2thRzeGajPm4.jpg",
      "release_date": "2009-01-01",
      "title": "Pulp Fiction: The Golden Age of Storytelling",
      "video": false,
      "vote_average": 4,
      "vote_count": 1
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        35
      ],
      "id": 738735,
      "original_language": "en",
      "original_title": "Stealing Pulp Fiction",
      "overview": "A diehard Quentin Tarantino fan recruits his friend Elizabeth to steal a 35mm film reel of Pulp Fiction.",
      "popularity": 0.825,
      "poster_path": "/5OHH3y2v8uwluOZLC2Kt8ENcjxn.jpg",
      "release_date": "2020-09-01",
      "title": "Stealing Pulp Fiction",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        99
      ],
      "id": 109005,
      "original_language": "en",
      "original_title": "Pulp Fiction Art: Cheap Thrills & Painted Nightmares",
      "overview": "A guilty pleasure of the mid-20th century, pulp fiction magazines were often defined less by their contents than by their provocative covers. This documentary explores the shocking art that brought life to these lurid publications. Filmmaker Jamie McDonald delves into the collection of art historian Robert Lesser, shedding light on this nearly forgotten art form and the ways it impacted popular culture.",
      "popularity": 0.42,
      "poster_path": "/pVpCuDyyvt3HRjVEYUUBOqrio7F.jpg",
      "release_date": "2005-01-01",
      "title": "Pulp Fiction Art: Cheap Thrills & Painted Nightmares",
      "video": false,
      "vote_average": 5.5,
      "vote_count": 4
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [],
      "id": 1320083,
      "original_language": "en",
      "original_title": "Stealing Pulp Fiction",
      "overview": "Three friends along with their therapist plan a heist to steal Quentin Tarantino's personal print of Pulp Fiction from his movie theater.",
      "popularity": 2.393,
      "poster_path": "/88Q0smOjVprA0UojCbN3JM7PuI5.jpg",
      "release_date": "",
      "title": "Stealing Pulp Fiction",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        18,
        10402,
        28,
        36,
        35,
        14
      ],
      "id": 1071134,
      "original_language": "en",
      "original_title": "The Tragedy Of Macwes",
      "overview": "The fearless knight Apallo learns that he is in over his head when attempting to proclaim his love to a princess.",
      "popularity": 0.001,
      "poster_path": "/iLBoU6n0OtnWF2MoUSVhBqeB8jS.jpg",
      "release_date": "",
      "title": "The Tragedy Of Macwes",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    }
  ]
  return (
    <div>
      <Title>Principais Filmes</Title>
      <MovieList movies={mock_movies}/>
    </div>
  );
}
