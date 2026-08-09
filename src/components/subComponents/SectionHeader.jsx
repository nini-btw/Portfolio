import PropTypes from "prop-types";
import "../../stylesheets/subStyle/sectionHeader.sass";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <header className="text-center heading-sec__mb-med">
      <h2 className="heading heading-sec">
        <span className="heading-sec__main">{title}</span>
      </h2>
      <p className="heading-sec__sub">{subtitle}</p>
    </header>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default SectionHeader;
