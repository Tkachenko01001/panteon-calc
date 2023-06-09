import React, { useState, useEffect } from 'react';
import CalcForm from '../Calc-form/Calc-form';
import ResultTable from '../Result-table/Result-table';
import shortid from 'shortid';

const App = () => {
  const [target, setTarget] = useState('1');
  const [mass, setMass] = useState('');
  const [amountOfReception, setAmountOfReception] = useState('');
  const [amountOfCarbohydrates, setAmountOfCarbohydrates] = useState('');
  const [totalNumberOfElements, setTotalNumberOfElements] = useState([]);

  useEffect(() => {
    const savedResults = localStorage.getItem('results');
    if (savedResults) {
      setTotalNumberOfElements(JSON.parse(savedResults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(totalNumberOfElements));
  }, [totalNumberOfElements]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.nameProduct.value;
    calcResult(shortid.generate(), name, target, mass, amountOfReception);
  };

  const handleChange = (e) => {
    const selectedValue = e.target.name;

    switch (selectedValue) {
      case 'target':
        setTarget(e.target.value);
        return;
      case 'mass':
        setMass(e.target.value);
        return;
      case 'amount-of-receptions':
        setAmountOfReception(e.target.value);
        return;
      case 'amount-of-carbohydrates':
        setAmountOfCarbohydrates(e.target.value);
        return;
      default:
        return;
    }
  };

  const handleDelete = (id) => {
    setTotalNumberOfElements((prevElements) =>
      prevElements.filter((element) => element.total.key !== id)
    );
  };
  
  const updateTotalNumberOfElements = (
    key,
    target,
    totalCarbohydrates,
    totalProtein,
    totalFats,
    name,
    oneDoseCarbohydrates,
    oneDoseProtein,
    oneDoseFats,
    oneDoseProduct,
  ) => {
    setTotalNumberOfElements((prevState) => [...prevState, {
      total: {
        key,
        target: target,
        carbohydrates: totalCarbohydrates,
        protein: totalProtein,
        fats: totalFats,
      },
      oneDose: [{
        name: name,
        oneDoseCarbohydrates,
        oneDoseProtein,
        oneDoseFats,
        oneDoseProduct,
      }],
    }]);
  };

  const calcResult = (key, name, target, mass, amountOfReception) => {
    let totalCarbohydrates = Math.round(3 * mass);
    let totalProtein = Math.round(1.5 * mass);
    let totalFats = Math.round(0.5 * mass);

    let oneDoseCarbohydrates = Math.round(totalCarbohydrates / amountOfReception);
    let oneDoseProtein = Math.round(totalProtein / amountOfReception);
    let oneDoseFats = Math.round(totalFats / amountOfReception);
    let oneDoseProduct = Math.round((oneDoseCarbohydrates * 100) / amountOfCarbohydrates);

    switch (target) {
      case 'Базовий розрахунок':
        totalCarbohydrates = Math.round(3 * mass);
        totalProtein = Math.round(1.5 * mass);
        totalFats = Math.round(0.5 * mass);
        oneDoseCarbohydrates = Math.round(totalCarbohydrates / amountOfReception);
        oneDoseProtein = Math.round(totalProtein / amountOfReception);
        oneDoseFats = Math.round(totalFats / amountOfReception);
        oneDoseProduct = Math.round((oneDoseCarbohydrates * 100) / amountOfCarbohydrates);
        break;

      case 'Набір ваги':
        totalCarbohydrates = Math.round(totalCarbohydrates + totalCarbohydrates * 15 / 100);
        totalProtein = Math.round(1.5 * mass);
        totalFats = Math.round(0.5 * mass);
        oneDoseCarbohydrates = Math.round(totalCarbohydrates / amountOfReception);
        oneDoseProtein = Math.round(totalProtein / amountOfReception);
        oneDoseFats = Math.round(totalFats / amountOfReception);
        oneDoseProduct = Math.round((oneDoseCarbohydrates * 100) / amountOfCarbohydrates);
        break;

      case 'Схуднення':
        totalCarbohydrates = Math.round(totalCarbohydrates - totalCarbohydrates * 15 / 100);
        totalProtein = Math.round(1.5 * mass);
        totalFats = Math.round(0.5 * mass);
        oneDoseCarbohydrates = Math.round(totalCarbohydrates / amountOfReception);
        oneDoseProtein = Math.round(totalProtein / amountOfReception);
        oneDoseFats = Math.round(totalFats / amountOfReception);
        oneDoseProduct = Math.round((oneDoseCarbohydrates * 100) / amountOfCarbohydrates);
        break;

      default:
        return;
    }

    updateTotalNumberOfElements(
      key,
      target,
      totalCarbohydrates,
      totalProtein,
      totalFats,
      name,
      oneDoseCarbohydrates,
      oneDoseProtein,
      oneDoseFats,
      oneDoseProduct,
    );
  };

  return (
    <div>
      <CalcForm calculation={handleSubmit} change={handleChange} target={target} />
      {totalNumberOfElements && <ResultTable totalNumberOfElements={totalNumberOfElements} onDelete={handleDelete} />}
    </div>
  );
}

export default App;