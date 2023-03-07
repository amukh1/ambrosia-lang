
  function println(x) 
    print("Ambrosia-Lua stdio: " .. x)
  end
  


  function main(x) 
    println("Hello!")
local re = differ(square)
println(re)
return 0
  end
  


  function square(x) 
    return
x * x

  end
  

local a = 2

  function differ(fn) 
    local h = 0.001
local ah = fn(a)
local ahh = fn(a + h)
return
( ahh - ah ) / h

  end
  

main()