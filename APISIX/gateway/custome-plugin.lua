local http = require("resty.http")
local cjson = require("cjson")
local jwt = require("resty.jwt")

local _M = {}

function _M.handler()
    local httpc = http.new()
    local res, err = httpc:request_uri("http://{APISIX_ADMIN_API}/apisix/admin/consumers/devops0", {
        method = "GET",
        headers = {
            ["Content-Type"] = "application/json",
        }
    })

    if not res then
        ngx.log(ngx.ERR, "Failed to request: ", err)
        return ngx.exit(ngx.HTTP_INTERNAL_SERVER_ERROR)
    end

    local body = cjson.decode(res.body)
    local jwt_auth = body.value.plugins["jwt-auth"]

    if not jwt_auth then
        ngx.log(ngx.ERR, "JWT auth plugin not found")
        return ngx.exit(ngx.HTTP_INTERNAL_SERVER_ERROR)
    end

    local token = jwt:sign(
        jwt_auth.secret,
        {
            header = { typ = "JWT", alg = "HS256" },
            payload = { key = jwt_auth.key, exp = ngx.time() + jwt_auth.exp }
        }
    )

    ngx.say(cjson.encode({ token = token }))
end

return _M
