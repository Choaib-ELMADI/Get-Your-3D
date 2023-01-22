import { models } from '../data';

import React, { createContext, useContext, useState } from 'react';
const Context = createContext();



export const StateContext = ({ children }) => {
    const [history, setHistory] = useState([]);
    const [filteredItems, setFilteredItems] = useState(models.filter(m => m.category === 'part'));
    const [atHome, setAtHome] = useState(true);

    const filtering = (section) => {
        setFilteredItems(models.filter(model => 
            (model.software === section) && (model.category === 'part')
        ));
    };

    const searching = (items, query) => {
        query = query.toLowerCase();
        return items.filter(item =>
          item.title.split(' ').some(word =>
            word.toLowerCase().startsWith(query)
          )
        );
    };

    const updateHistory = (elt) => {
        if (history.length < 1) setHistory([...history, elt]);
        else {
            history.map(h => {
                if (elt.title !== h.title) setHistory([...history, elt]);
                else {
                    const exist = history.filter(h => h.title !== elt.title);
                    setHistory([
                        ...exist,
                        elt
                    ])
                }
            });
        };
    };

    const hide = (itm) => {
        setHistory(
            history.filter(h => h.title !== itm.title)
        )
    };

    const filterDrawings = (cat) => {
        setFilteredItems(models.filter(model => 
            model.category === cat
        ));
    };


    return (
        <Context.Provider
            value= {{
                history,
                setHistory,
                filtering,
                filteredItems,
                setFilteredItems,
                atHome,
                setAtHome,
                searching,
                updateHistory,
                hide,
                filterDrawings,
            }}
        >
            { children }
        </Context.Provider>
    );
}

export const useStateContext = () => useContext(Context);