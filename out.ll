
 declare i32 @printf(i8*, ...) nounwind 
define i32 @println(str %x) {
        call i32 @print(str %x)
ret i32 0
      }
define i32 @main(i32 %argc,i8 %*,* %argv) {
         @.textstr = internal constant [20 x i8] c"Argument count: %d\0A\00" 
      }
ret i32 0