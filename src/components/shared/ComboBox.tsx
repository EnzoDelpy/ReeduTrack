import { useState, useRef, useEffect, ReactNode } from "react";
import ChevronUp from "../icons/ChevronUp";
import { motion, AnimatePresence } from "framer-motion";

interface ComboBoxItem {
  id: string;
  text: string;
}

const Combobox = ({ items, children, setSelectedItem, border }: { items: ComboBoxItem[], children: ReactNode, setSelectedItem: (item: ComboBoxItem | null)=> void, border?:string}) => {
  const [textValue, setTextValue] = useState(""); // Texte affiché dans l'input
  const [filteredItems, setFilteredItems] = useState(items); // Liste filtrée
  const [isOpen, setIsOpen] = useState(false); // Gère l'ouverture de la popup

  // Références pour l'input de recherche et la popup
  const searchInputRef = useRef<HTMLInputElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  // Mettre le focus sur le champ de recherche quand la popup s'ouvre
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Gère la recherche dans la popup
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.text.toLowerCase().includes(value)
    );
    setFilteredItems(filtered);
  };

  // Gère la sélection d'un utilisateur depuis la popup
  const handleSelectUser = (item: ComboBoxItem) => {
    setSelectedItem(item); // Met à jour l'utilisateur sélectionné
    setTextValue(item.text); // Affiche la sélection dans l'input
    setIsOpen(false); // Ferme la popup après sélection
  };

  // Gère le clic sur l'input de base pour ouvrir/fermer la popup
  const handleInputClick = () => {
    if (!isOpen) setFilteredItems(items);
    setIsOpen(!isOpen); // Inverse l'état d'ouverture/fermeture de la popup
  };

  // Ferme la popup si l'utilisateur clique en dehors
  const handleClickOutside = (event: MouseEvent) => {
    if (
      elementRef.current &&
      !elementRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Ajoute l'écouteur d'événements pour les clics en dehors de la popup
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={elementRef} className="relative min-w-64">
      {/* Champ de saisie non modifiable directement */}
      <div
        onClick={handleInputClick} // Ouvre/ferme la popup au clic
        className={`w-full rounded-lg px-4 py-2 cursor-pointer out bg-white h-12 flex items-center gap-[0.625rem] ${border  ? border : ""}`}
      >
        <div className="h-8 w-8 bg-bg-color rounded-md flex items-center justify-center">
          <div className="rotate-180 scale-[0.60]">
            <ChevronUp></ChevronUp>
          </div>
        </div>
        {textValue ? (
          <span>{textValue}</span>
        ) : (
          <span className="text-placeholder-color">
            {`Sélectionner un ${children}`}
          </span>
        )}
      </div>

      {/* Popup pour la recherche */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1 }}
            className={`absolute z-20 w-full bg-white rounded-lg p-2 top-[calc(100%_+_0.375rem)] ${border  ? border : ""}`}
          >
            {/* Champ de recherche dans la popup */}
            <input
              type="text"
              ref={searchInputRef} // Mettre le focus sur cet input
              onChange={handleSearchChange}
              placeholder={`Rechercher un ${children}`}
              className="w-full border border-gray-custom rounded-md px-4 py-2 mb-2 outline-none placeholder-placeholder-color"
            />

            {/* Liste des utilisateurs filtrés */}
            <ul className="max-h-40 overflow-y-auto scrollbar-thin">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                    onClick={() => handleSelectUser(item)}
                  >
                    {item.text}
                  </li>
                ))
              ) : (
                <li className="p-2 text-placeholder-color">
                  Aucun resultat trouvé
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Combobox;
