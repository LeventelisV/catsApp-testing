export default function Filter({filters,setFilters}) {

  const genderChanged = (event) => {
  }
 
  return (
    <div className="pet-filter-container">
      <div className="filter-container">
        <label htmlFor="favourite">Favourite</label>
        <select name="favourite" id="favourite" className="form-select" onChange={(event)=>{
          setFilters({...filters,favorite:event.target.value})
        }}>
          <option value="any">Any</option>
          <option value="favoured">Favoured</option>
          <option value="not favoured">Not Favoured</option>
        </select>
      </div>
      <div className="filter-container">
        <label htmlFor="gender">Gender</label>
        <select name="gender" id="gender" className="form-select" onChange={(event)=>{
              setFilters({...filters,gender:event.target.value})
        }}>
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
}
