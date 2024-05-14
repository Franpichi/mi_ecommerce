import React from 'react';

const SomePrivateComponent = () => {
    return (
        <div>
            <h1 className='horologium-title'>Página Privada</h1>
            <p className='title'>Esta es una sección solo para usuarios autenticados.</p>
        </div>
    );
};

export default SomePrivateComponent;
