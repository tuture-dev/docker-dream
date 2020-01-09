import React from "react";
import PropTypes from "prop-types";
import FilterLink from "../components/Link";

const FILTER_TITLES = ["All", "Active", "Completed"];

const Footer = props => {
  const { activeCount } = props;
  const itemWord = activeCount === 1 ? "item" : "items";
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {FILTER_TITLES.map(filter => (
          <li key={filter}>
            <FilterLink filter={filter}>{filter}</FilterLink>
          </li>
        ))}
      </ul>
    </footer>
  );
};

Footer.propTypes = {
  activeCount: PropTypes.number.isRequired
};

export default Footer;
