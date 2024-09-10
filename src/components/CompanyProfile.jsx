import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import 'tailwindcss/tailwind.css';
import { Plus, Check, SquarePlus, X, CircleX } from 'lucide-react';

export default function CompanyProfile() {
  const [formData, setFormData] = useState({
    companyName: '',
    headquarters: '',
    yearOfEstablishment: '',
    brandsList: '',
    serviceCountriesList: []
  });

  const [selectedTab, setSelectedTab] = useState('manufacturer');
  const [subCatalogues, setSubCatalogues] = useState([
    'Televisions', 'Home Theatre', 'Cameras', 'Headphones',
    'Wireless Speakers', 'Projectors', 'Printers', 'Mobiles',
    'Monitors', 'Gaming Console', 'Soundbars'
  ]);
  const [selectedSubCatalogue, setSelectedSubCatalogue] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleSubCatalogueClick = (category) => {
    setSelectedSubCatalogue(category);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setSubCatalogues([...subCatalogues, newCategory]);
      setNewCategory('');
      setAddingCategory(false);
    }
  };

  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions || []);
  };

  const handleServiceCountryChange = (selectedOptions) => {
    setFormData({
      ...formData,
      serviceCountriesList: selectedOptions || []
    });
  };

  const removeCountry = (country) => {
    setSelectedCountries(selectedCountries.filter(c => c.value !== country.value));
  };

  const removeServiceCountry = (country) => {
    setFormData({
      ...formData,
      serviceCountriesList: formData.serviceCountriesList.filter(c => c.value !== country.value)
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2B2B2B',
      borderColor: '#373A40',
      color: 'white',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#31363F',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#FF8400' : '#282A3A',
      color: 'white',
      '&:hover': {
        backgroundColor: '#FF8400',
        borderColor: '#31363F',
        color: 'white',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValue: (provided) => ({
      ...provided,
      display: 'none',
    }),
  };

  const CountrySelect = ({ value, onChange, placeholder }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
      fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      )
        .then((response) => response.json())
        .then((data) => {
          setCountries(data.countries);
        });
    }, []);

    return (
      <Select
        options={countries}
        value={value}
        isMulti
        styles={customStyles}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  };

  return (
    <div className="text-white px-6 pt-1 rounded-lg w-full">
      <div className="space-x-4 mb-4">
        <button
          onClick={() => handleTabChange('manufacturer')}
          className={`rounded ${selectedTab === 'manufacturer' ? 'text-orange-600 underline' : ''}`}
        >
          Manufacturer
        </button>
        <button
          onClick={() => handleTabChange('catalogue')}
          className={`${selectedTab === 'catalogue' ? 'text-orange-600 underline' : ''}`}
        >
          Catalogue
        </button>
      </div>

      {selectedTab === 'manufacturer' && (
        <div className="flex">
          <div className="w-full">
            {['companyName', 'headquarters', 'yearOfEstablishment', 'brandsList'].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block mb-2 text-md capitalize">{field.split(/(?=[A-Z])/).join(" ")}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-neutral-800 text-white"
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="block mb-2 text-md">Service Countries List</label>
              <CountrySelect
                value={formData.serviceCountriesList}
                onChange={handleServiceCountryChange}
                placeholder="Select service countries..."
              />
            </div>
            <div className="mb-3 text-sm">
              {formData.serviceCountriesList.map((country, index) => (
                <div key={index} className="inline-flex items-center border border-white rounded-md text-white px-3 py-1 mr-2">
                  <span>{country.label}</span>
                  <CircleX className="ml-2 cursor-pointer text-orange-500" size={16} onClick={() => removeServiceCountry(country)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'catalogue' && (
        <div className="">
          <div className=" mb-3 text-sm pl-1">
            <p>Catalogue Sectors</p>
          </div>
          <div className='mb-4'>
            <CountrySelect
              value={selectedCountries}
              onChange={handleCountryChange}
              placeholder="Select countries..."
            />
          </div>
          <div className="mb-3 text-sm">
            {selectedCountries.map((country, index) => (
              <div key={index} className="inline-flex items-center border border-white text-white px-3 py-1 mr-2 mb-2">
                <span>{country.label}</span>
                <CircleX className="ml-2 cursor-pointer text-orange-500" size={16} onClick={() => removeCountry(country)} />
              </div>
            ))}
          </div>
          <div className=" mb-3 text-md pl-1">
            <p>Sub Catalogues</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {subCatalogues.map((category, index) => (
              <div
                key={index}
                className={`grid-item flex justify-center items-center h-20 rounded cursor-pointer ${selectedSubCatalogue === category ? 'bg-orange-500' : 'bg-neutral-800'}`}
                onClick={() => handleSubCatalogueClick(category)}
              >
                <span className="mr-2">{category}</span>
                {selectedSubCatalogue === category ? (
                  <Check className="text-white" size={24} />
                ) : (
                  <Plus className="text-white" size={24} />
                )}
              </div>
            ))}
            {addingCategory ? (
              <div className="flex items-center h-20 border-2 border-dashed border-orange-500 rounded p-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-grow bg-transparent text-white outline-none text-sm"
                  placeholder="New Category"
                />
                <button onClick={handleAddCategory} className="ml-0.5 text-orange-500 text-xs">Add</button>
              </div>
            ) : (
              <div
                className="grid-item add-more border-2 border-dashed border-orange-500 flex justify-center items-center h-20 rounded cursor-pointer"
                onClick={() => setAddingCategory(true)}
              >
                <SquarePlus className=" text-orange-500" size={24} />
                <span className="ml-2">Add more</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <button className="bg-orange-500 text-white py-2 px-4 rounded">Add Asset</button>
      </div>
    </div>
  );
}
