import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
  try {
    const { method, url } = req

    await json(req, res)

    // Encontre a rota que corresponde ao método e URL
    const route = routes.find(route => {
      return route.method === method && route.path.test(url)
    })

    if (route) {
      const routeParams = route.path.exec(url)

      if (routeParams) {
        const { query, ...params } = routeParams.groups || {}

        if (route.requiresId) {
          const { id } = params;

          if (!id) {
            console.log("O id é obrigatório.");
            return res.writeHead(400).end("O id é obrigatório.");
          }
        }

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
      } else {
        return res.writeHead(404).end("Rota não encontrada.")
      }
    }

    return res.writeHead(404).end("Rota não encontrada.")
  } catch (error) {
    console.error("Erro no processamento da requisição:", error)
    return res.writeHead(500).end("Erro interno do servidor.")
  }
})

server.listen(3333, () => {
  console.log('Servidor ouvindo na porta 3333')
})
