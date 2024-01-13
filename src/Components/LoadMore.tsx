interface LoadMoreProps {
  onClick: () => void;
}

const LoadMore = ({ onClick }: LoadMoreProps) => {
  return (
    <button type="button" className=" col-10 btn btn-dark" onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMore;
