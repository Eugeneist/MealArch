import IconButton from '@mui/material/IconButton';
import UndoIcon from '@mui/icons-material/Undo';
import styles from './ShoppingList.module.scss';

interface ShoppingListProps {
  onClick?: (componentId: number) => void;
  selectedComponent: number;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  onClick,
  selectedComponent,
}) => {
  const handleClick = (componentId: number) => {
    if (onClick) {
      onClick(componentId);
    }
  };

  return (
    <>
      {selectedComponent === 0 && (
        <div onClick={() => handleClick(3)} className={styles.list}>
          <h4>Shopping List</h4>
        </div>
      )}

      {selectedComponent === 3 && (
        <div className={styles.list}>
          <p>Inside Shopping List</p>
          <IconButton
            onClick={() => {
              if (onClick) {
                onClick(0);
              }
            }}
            aria-label="back"
          >
            <UndoIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default ShoppingList;
