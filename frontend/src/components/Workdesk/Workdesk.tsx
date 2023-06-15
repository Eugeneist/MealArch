import { useState } from 'react';
import { MealCalendar } from '../MealCalendar';
import { RecipeBook } from '../RecipeBook';
import { ShoppingList } from '../ShoppingList';
import styles from './Workdesk.module.scss';

const Workdesk: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<number>(0);

  return (
    <>
      {selectedComponent === 0 && (
        <div className={styles.workdesk__menu}>
          <MealCalendar
            onClick={setSelectedComponent}
            selectedComponent={selectedComponent}
          />
          <div className={styles.workdesk__tools}>
            <RecipeBook
              onClick={setSelectedComponent}
              selectedComponent={selectedComponent}
            />
            <ShoppingList
              onClick={setSelectedComponent}
              selectedComponent={selectedComponent}
            />
          </div>
        </div>
      )}
      {selectedComponent === 1 && (
        <div className={styles.workdesk}>
          <MealCalendar
            onClick={setSelectedComponent}
            selectedComponent={selectedComponent}
          />
        </div>
      )}
      {selectedComponent === 2 && (
        <div className={styles.workdesk}>
          <RecipeBook
            onClick={setSelectedComponent}
            selectedComponent={selectedComponent}
          />
        </div>
      )}
      {selectedComponent === 3 && (
        <div className={styles.workdesk}>
          <ShoppingList
            onClick={setSelectedComponent}
            selectedComponent={selectedComponent}
          />
        </div>
      )}
    </>
  );
};

export default Workdesk;
