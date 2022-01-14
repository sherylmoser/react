import { useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Grid, Icon, Input, Menu, Modal } from "semantic-ui-react"
import { Company } from "../../components/company"
import { useGlobalContext } from "../../contexts/global.context"
import API, { CompanyType } from "../../dataLayer/api"

type ParamsType = { id?: string }

type LoaderState = {
    connecting?: boolean;
    disconnecting?: boolean;
    fetching?: boolean;
}

export function CompaniesView() {
    const { id } = useParams<ParamsType>();

    const { state: { loggedIn, user } } = useGlobalContext();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string | undefined>();
    const [loaders, setLoaders] = useState<LoaderState>({})

    const navigate = useNavigate();

    const { data: companies } = useQuery(["companies"], async () => {
        const { data, status } = await API.getCompanies()
        return data
    })
    const { data: connectedCompanies, refetch: refetchConnectedCompanies } = useQuery(["connectedCompanies", user?.username], async () => {
        if (!user?.username) {
            return Promise.resolve([])
        }
        const { data, status } = await API.getConnectedCompanies(user?.username)
        return data || []
    })

    const handleSearch = ({ target: { value } }: any) => {
        setSearch(value)
    }
    const filteredCompanies = useMemo(() => {
        if (!search) {
            return companies
        }
        const searchLowered = search?.toLowerCase()
        // return companies?.filter(({ name }) => name.toLowerCase().includes(searchLowered))
        return companies?.filter((company) => JSON.stringify(Object.values(company)).toLowerCase().includes(searchLowered))
    }, [search, companies]) //memo will rerun the second argument every time the first argument changes

    const company = useMemo(() => {
        return companies?.find((company) => String(company.id) === id)
    }, [id, companies])

    const handleSelectCompany = (companyId: number) => () => {
        navigate(`/companies/${companyId}`)
    }

    const handleConnect = async (company: CompanyType) => {
        console.log("company", company);
        if (!loggedIn) {
            setModalOpen(true)
        } else if (user?.username) {
            setLoaders({ connecting: true })
            await API.connectToCompany(user?.username, company.id);
            setLoaders({ fetching: true })
            await refetchConnectedCompanies();
            setLoaders({})
        }
    }

    const handleDisconnect = async (company: CompanyType) => {
        if (user?.username) {
            setLoaders({ connecting: true })
            await API.disconnectFromCompany(user?.username, company.id);
            setLoaders({ fetching: true })
            await refetchConnectedCompanies();
            setLoaders({})
        }

    }

    const closeModal = () => setModalOpen(false)

    const handleNavigate = (to: string) => () => {
        navigate(to)
    }

    return (
        <div>
            <h1>Companies</h1>
            <Grid>
                <Grid.Column width={5}>
                    <Input size="small" onChange={handleSearch} />
                    <Menu vertical style={{ opacity: loaders.fetching ? '.4' : '1' }}>
                        {filteredCompanies?.map((company) => (
                            <Menu.Item
                                active={String(company.id) === id}
                                key={company.id}
                                onClick={handleSelectCompany(company.id)}>
                                {connectedCompanies?.includes(company.id) && <Icon name="star" />}{company.name}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Grid.Column>
                <Grid.Column width={11}>
                    {company ? (
                        <Company
                            company={company}
                            connected={connectedCompanies?.includes(company.id)}
                            onConnect={handleConnect}
                            onDisconnect={handleDisconnect}
                            connecting={loaders.connecting}
                        />
                    ) : (
                        <h2>Please select a company</h2>
                    )
                    }
                </Grid.Column>
            </Grid>
            <Modal open={modalOpen} onClose={closeModal}>
                <Modal.Header>
                    You Must Be Logged In
                </Modal.Header>
                <Modal.Content>
                    Please log in or sign up in order to connect to a company
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={closeModal}> Cancel</Button>
                    <Button primary onClick={handleNavigate(`/sign-up?redirect=/companies/${id}`)}>Sign Up</Button>
                    <Button primary onClick={handleNavigate(`/login?redirect=/companies/${id}`)}>Log In</Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}