import React from 'react';
import ReactDom from 'react-dom';
// import './style/global.less';
import { AppContainer} from 'react-hot-loader';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import route from './route';
interface RouterItem  {
    path?:string,
    component?:any,
    exact?: boolean,
    children?: any,
    key?: string,
    render?: any
}

/**
 * switch 匹配一个
 * switch + exact 精确匹配第一个
 */
const renderRouter = (item: RouterItem) =>{
    let params: RouterItem = {
        key: item.path,
        exact:item.exact !== false,
        path: item.path
    }

    if(item.children){
        params = {
            ...params,
            render: (data: any) => {
                return item.component(data);
            }
        }
    } else {
        params = {
            ...params,
            component: item.component
        }
    }

			return <Route
				{...params}
			></Route>


}
const App = () => {
    return (
    <AppContainer>
       <BrowserRouter>
        <Switch> 
            {
                route.map((item: RouterItem) => {
                    if(item.children){
                        const Layout = item.children.layout;
						item.component = (data:RouterItem) => {
                            return (
                                <Layout key={item.path} {...data}>
                                {
                                    item.children.routes.map((children: RouterItem) => {
                                        return renderRouter(children);
                                    })
                                } 
                                </Layout>
                            )
                        }
                    }
                    return renderRouter(item);
                })
            }
        </Switch>
       </BrowserRouter>
    </AppContainer>
    )
}

ReactDom.render(
   <App/>
    ,
    document.getElementById('app')
)

if ((module as any).hot) {
    (module as any).hot.accept(() => {
      ReactDom.render(
        <App/>,
        document.getElementById('app')
      )
    })
  }
