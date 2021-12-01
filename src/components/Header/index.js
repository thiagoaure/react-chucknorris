import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Grid,
  GridItem,
  Container,
  FormControl,
  FormLabel,
  Select
}  from '@chakra-ui/react'
import Logo from '../../assets/logo.jpeg';

import api from '../../services/api'


const Header = () => {
  const [main, setMain] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api.get('categories').then(
      res => {
        setMain(res.data)
      }
    )
  }, [])

  const handleCategory = (e) => {
    navigate(`/categories/${e.target.value}`)
  }

  return(
    <nav>
      <Container maxW="container.xl">
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          <GridItem colStart={1}>
            <Link to='/'>
              <img src={Logo} className="logo" alt="Logo" />
            </Link>
          </GridItem>
          <GridItem>
            <div className="uteis-links">
                <a target="__blank" href="https://chucknorris.com/"> Filmes </a>
                <a target="__blank" href="https://chucknorrisfacts.net/"> Fatos </a>
                <a target="__blank" href="https://en.wikipedia.org/wiki/Chuck_Norris"> Biografia </a>
                <a target="__blank" href="https://www.jogos360.com.br/chuck_norris.html"> Jogo </a>
            </div>
          </GridItem>
          <GridItem colStart={6} colEnd={12} h="150px">
            <FormControl className="joke-control">
              <FormLabel >Selecione a categoria de sua piada</FormLabel>
              <Select className="joke-select" onChange={handleCategory}>
                {main?.map( (item, index) => (
                  <option key={index} value={item}> {item} </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        </Grid>
      </Container>
    </nav>
  )
}

export default Header;