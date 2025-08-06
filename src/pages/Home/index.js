import { useState } from "react"
import { Header } from "../../components/Header"
import backgroundImage from "../../assets/image-git.png"
import ItemList from "../../components/ItemList"
import "./styles.css"

function App() {
  const [user, setUser] = useState("")
  const [currentUser, setCurrentUser] = useState(null)
  const [repos, setRepos] = useState(null)
  const [searchRepo, setSearchRepo] = useState("")

  // Filtra os repositórios com base no input de pesquisa
  const repositoriosFiltrados = repos?.filter((repo) =>
    repo.name.toLowerCase().includes(searchRepo.toLowerCase())
  )

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()
    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser
      setCurrentUser({ avatar_url, name, bio, login })
      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      )
      const newRepos = await reposData.json()

      if (newRepos.length) {
        setRepos(newRepos)
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img
          src={backgroundImage}
          alt="GitHub Background"
          className="background"
        />
        <div className="info">
          <h2>Encontre um perfil Github</h2>
          <div className="search-user">
            <input
              name="usuario"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              placeholder="@username"
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className="perfil">
                <img
                  src={currentUser.avatar_url}
                  className="profile"
                  alt="foto de perfil"
                />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}
          {repos?.length ? (
            <div className="result">
              <div className="search">
                <h4 className="repositorio">Repositórios</h4>
                <input
                  name="repositorio"
                  value={searchRepo}
                  onChange={(event) => setSearchRepo(event.target.value)}
                  placeholder="Buscar repositório"
                />
              </div>
              {/* Mapeia os repositórios FILTRADOS para renderizar */}
              {repositoriosFiltrados.map((repo) => (
                <ItemList
                  key={repo.id}
                  title={repo.name}
                  description={repo.description}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default App
