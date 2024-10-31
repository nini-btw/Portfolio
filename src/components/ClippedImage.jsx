const ClippedImage = () => {
  return (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      <svg width="0" height="0">
        <defs>
          <clipPath id="clipPath">
            <path
              fill="#1248c6"
              d="M37.6,-63.5C51,-57.3,65.9,-51.9,70.5,-41.5C75.2,-31.1,69.6,-15.5,68.3,-0.8C66.9,14,69.8,28,64.8,37.9C59.9,47.8,47.2,53.7,35.1,58.5C23,63.4,11.5,67.1,-0.7,68.3C-12.9,69.6,-25.9,68.4,-35.3,62.1C-44.7,55.7,-50.7,44.2,-55.5,33C-60.4,21.8,-64.2,10.9,-63.9,0.2C-63.6,-10.6,-59.2,-21.1,-55.7,-34.5C-52.1,-48,-49.3,-64.3,-40.1,-73C-31,-81.7,-15.5,-82.9,-1.7,-79.9C12.1,-76.9,24.1,-69.8,37.6,-63.5Z"
              transform="translate(100 100) scale(1)"
            />
          </clipPath>
        </defs>
      </svg>
      <img
        src="../../images/png/20230615_182139-removebg-preview.png"
        alt="Example"
        style={{
          width: '100%',
          height: '100%',
          clipPath: 'url(#clipPath)',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default ClippedImage;
