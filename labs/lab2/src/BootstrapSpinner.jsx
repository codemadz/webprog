export default function BootstrapSpinner(){
    return (
      <div>     
        <div className="d-flex justify-content-center">
         <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
       </div>
        <div>
            <p className="text-center">Laddar innehåll...</p>
        </div>
      </div>
    );
  }