import { useState } from "react";
interface GenreListProps {
  genres: never[];
  handleGenre: (selectedGenre: number) => void;
}

const GenreList = ({ genres, handleGenre }: GenreListProps) => {
  const [thisIndex, setThisIndex] = useState<number>(0);
  return (
    <ul className="genre-list mt-5">
      {[{ id: 2, name: "Featured" }].concat(genres).map((item, index) => (
        <li
          key={item["id"]}
          onClick={() => {
            setThisIndex(index);
            handleGenre(item["id"]);
          }}
          className={
            thisIndex == index
              ? "selected-border" + " genre-list-item"
              : "genre-list-item"
          }
        >
          {item["name"]}
        </li>
      ))}
    </ul>
  );
};

export default GenreList;
