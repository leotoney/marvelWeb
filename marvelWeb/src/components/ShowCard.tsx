interface ShowCardProps {
  title: string
  image: string
  onClick: () => void
}

function ShowCard({ title, image, onClick }: ShowCardProps) {
  return (
    <div className="comic-card" onClick={onClick}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </div>
  )
}

export default ShowCard