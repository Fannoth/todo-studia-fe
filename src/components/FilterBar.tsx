import { FC } from 'react';
import styles from './FilterBar.module.css';

type FilterBarProps = {
  filterText: string;
  setFilterText: (filterText: string) => void;
  filterCompleted: boolean;
  setFilterCompleted: (filterCompleted: boolean) => void;
};

const FilterBar: FC<FilterBarProps> = ({ filterText, setFilterText, filterCompleted, setFilterCompleted }) => {
  return (
    <div className={styles.filterBarContainer}>
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Filter by name"
        className={styles.filterInput}
      />
      <label className={styles.filterLabel}>
        <input
          type="checkbox"
          checked={filterCompleted}
          onChange={(e) => setFilterCompleted(e.target.checked)}
          className={styles.checkbox}
        />
        Show only completed
      </label>
    </div>
  );
};

export default FilterBar;
