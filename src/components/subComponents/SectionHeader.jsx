import PropTypes from "prop-types";
import "../../stylesheets/subStyle/sectionHeader.sass";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <header className="text-center">
      <h2 className="heading heading-sec heading-sec__mb-med">
        <span className="heading-sec__main">{title}</span>
        <span className="heading-sec__sub">{subtitle}</span>
      </h2>
    </header>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default SectionHeader;
