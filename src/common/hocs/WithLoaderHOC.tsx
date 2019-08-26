import React from 'react';
import 'common/styles'

interface IWithLoaderHOC {
    loading: boolean;
}

export const WithLoaderHOC =
        <T, >(WrappedComonent: React.ComponentType<T>) => {
            return class WithLoaderHOC extends React.Component<T & IWithLoaderHOC> {

            renderLoading = () => (<div className='center text-roboto--large-bold'>Loading</div>);

            render() {
                return this.props.loading ? this.renderLoading() : <WrappedComonent {...this.props} />;
            }   
    }
}
