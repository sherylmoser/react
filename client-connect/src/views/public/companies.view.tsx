import { useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { Grid, Input, Menu } from "semantic-ui-react"
import API from "../../dataLayer/api"

type ParamsType = { id?: string }

export function CompaniesView() {
    const { id } = useParams<ParamsType>()
    const navigate = useNavigate()
    const [search, setSearch] = useState<string | undefined>()
    const { data: companies } = useQuery(["companies"], async () => {
        const { data, status } = await API.getCompanies()
        return data
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

    return (
        <div>
            <h1>Companies</h1>
            <Grid>
                <Grid.Column width={5}>
                    <Input size="small" onChange={handleSearch} />
                    <Menu vertical>
                        {filteredCompanies?.map((company) => (
                            <Menu.Item
                                active={String(company.id) === id}
                                key={company.id}
                                onClick={handleSelectCompany(company.id)}>
                                {company.name}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Grid.Column>
                <Grid.Column width={11}>
                    {company ? (
                        <pre>{JSON.stringify(company, null, 2)}</pre>
                    ) : (
                        <h2>Please select a company</h2>
                    )
                    }
                </Grid.Column>
            </Grid>
        </div>
    )
}