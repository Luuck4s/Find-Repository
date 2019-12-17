import React from 'react'
import { Container, Header, Icon, Image, Label } from 'semantic-ui-react'
import moment from 'moment'

const useStyles = {
    container: {
        marginTop: '5%',
        marginBottom: '5%',
        padding: '2%',
        backgroundColor: '#FFF',
        borderRadius: 25,
        boxShadow: '5px 5px 5px rgba(50, 50, 50, 0.77)',
        WebkitBoxShadow: '5px 5px 5px rgba(50, 50, 50, 0.77)',
        MozBoxShadow: '5px 5px 5px rgba(50, 50, 50, 0.77)'
    },
    informations: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    user_informations: {
        padding: '2%',
        fontSize: 17,
        textAlign: 'Justify'
    },
    location: {
        marginTop: -50,
        fontSize: 14,
        alignSelf: 'flex-end'
    },
    textInformations: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    githubIcon: {
        alignSelf: 'flex-end'
    },
    repository: {
        padding: '2%'
    },
    title: {
        fontSize: 16,
    },
    description: {
        marginTop: '1%',
        fontSize: 15,
    },
    date: {
        marginTop: '1%',
        fontSize: 13,
    }
}

const Result = (props) => (
    <Container style={useStyles.container} >
        <Container style={useStyles.informations}>
            <Image src={props.user_data.avatar_url} alt={"User Photo"} size='medium' bordered circular />
            <Container style={useStyles.textInformations}>
                <Header as='h2' style={{ padding: '2%' }}>
                    {props.user_data.name || "no name"}
                </Header>
                <Label style={useStyles.location}>
                    <Icon name={"flag"} />
                    {props.user_data.location}
                </Label>
                <p style={useStyles.user_informations}>
                    {props.user_data.bio || "no bio"}
                </p>
                <Label style={{ marginLeft: '2%', fontSize: 12 }}>
                    Create at {moment(props.user_data.created_at, "YYYY-MM-DD hh:mm:ss").fromNow()}
                </Label>
                <Label as='a' href={props.user_data.html_url} target="blank" style={useStyles.githubIcon}>
                    <Icon size={'big'} name={"github square"} /> Go to GitHub
                </Label>
            </Container>
        </Container>
        <div className="ui relaxed divided list">
            {props.user_repos.map((repos) => (
                <div className="item" style={useStyles.repository} key={repos.id}>
                    <i className="huge github middle aligned icon"></i>
                    <div className="content">
                        <a className="header" style={useStyles.title} href={repos.html_url} target="blank">{repos.name}</a>
                        <div className="description" style={useStyles.description}>{repos.description || "no description"}</div>
                        <div className="description" style={useStyles.date}>Create at {moment(repos.created_at, "YYYY-MM-DD hh:mm:ss").fromNow()}</div>
                        {repos.language &&
                            <button disabled style={{ marginTop: '1%' }} className="ui basic label" data-tooltip={`${repos.language} is the technology that was most used in this project.`} >{repos.language}</button>
                        }
                    </div>

                </div>
            ))}
        </div>
    </Container >
)


export default Result
