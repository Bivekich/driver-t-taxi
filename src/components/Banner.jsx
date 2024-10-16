const Banner = ({ imageUrl, link }) => {
  return (
    <div className="mb-4">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={imageUrl}
          alt="Banner"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </a>
    </div>
  );
};

export default Banner;
