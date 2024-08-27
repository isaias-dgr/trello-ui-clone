import React from "react";

interface ListProps {
  items?: string[];
}

const List: React.FC<ListProps> = ({ items }) => {
  return <div>List</div>;
};

export default List;
