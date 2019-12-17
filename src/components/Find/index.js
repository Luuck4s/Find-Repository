import React, { Component } from 'react'
import api from '../../services/api'
import { Button, Input, Container, Header, Icon, Label, Image, } from 'semantic-ui-react'
import Result from '../Result'
import image_perfil from '../../imgs/image_perfil.svg'

const useStyles = {
    container: {
        marginTop: '5%',
        padding: '2%',
        backgroundColor: '#FFF',
        borderRadius: 25,
        boxShadow: '5px 5px 5px rgba(50, 50, 50, 0.77)',
        WebkitBoxShadow: '5px 5px 5px rgba(50, 50, 50, 0.77)',
        MozBoxShadow: '5px 5px 5px rgba(50, 50, 50, 0.77)'
    },
    card: {
        backgroundColor: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2%',
    },
    header: {
        backgroundColor: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2%'
    },
    button: {
        margin: '3%',
    },
    input: {
        fontSize: 15,
        width: 300,
    }
}


class Find extends Component {

    state = {
        user_name: '',
        user_data: [],
        user_repos: [],
        success: false,
        loading: false,
        error: false,
        no_name: false
    }

    changeName = () => {
        let name = document.querySelector('#root input').value

        this.setState({ user_name: name })
    }

    makeQuery = async () => {
        if (this.state.user_name.length > 0) {

            this.setState({ loading: true, error: false, no_name: false })

            await api.get(`/users/${this.state.user_name}`).then((response) => {

                this.setState({ user_data: response.data })

                this.makeQueryFindRepository(response.data.repos_url)

            }).catch((error) => {
                this.setState({ loading: false, error: true })
                console.log(error)
            })
        } else {
            this.setState({ no_name: true })
        }

    }

    makeQueryFindRepository = async (uri) => {

        await api.get(uri).then((response) => {

            this.setState({ user_repos: response.data, loading: false, success: true })

        }).catch((error) => {
            this.setState({ loading: false, error: true })
            console.log(error)
        })
    }

    render() {

        const { error, loading, no_name, user_data, user_repos, success } = this.state
        return (
            <div>
                <Container style={useStyles.container}>
                    <div style={useStyles.header}>
                        <Header as="h1">Find User in GitHub <Icon name='github' circular /></Header>
                        <div style={useStyles.card}>
                            <Input style={useStyles.input} loading={loading} error={error}
                                icon='github' id="user" placeholder='User name'
                                value={this.state.user_name} onChange={this.changeName} />
                            {no_name &&
                                <Label circular color='red' pointing>Please enter a user name</Label>
                            }
                            <Button className="ui icon button" size='large' loading={loading} style={useStyles.button} onClick={this.makeQuery}>
                                Search <Icon name={"search"} />
                            </Button>
                        </div>

                    </div>
                    <a href={"https://www.github.com/Luuck4s"} className="ui blue image label" data-tooltip="Go to my GitHub :)">
                        <Image src={image_perfil} alt={"Image a perfil"} />
                        Luuck4s
                        <div className="detail">Developer</div>
                    </a>
                </Container>
                {success &&
                    <Result user_data={user_data} user_repos={user_repos} />
                }
            </div>
        )
    }


}

export default Find
