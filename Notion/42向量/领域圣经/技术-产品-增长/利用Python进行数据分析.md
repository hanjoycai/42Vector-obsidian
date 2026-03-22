---
base: "[[技术-产品-增长.base]]"
作者: Wes McKinney
分类:
  - 数据分析/统计学
简介: ""
封面:
  - "[[Notion/42向量/领域圣经/成长-关系-职场/assets/《10x Is Easier Than 2x》10倍比2倍容易/https--42notion.oss-cn-shenzhen.aliyuncs.com-book-%E5%88%A9%E7%94%A8Python%E8%BF%9B%E8%A1%8C%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90.jpg]]"
---
## 前言

《利用Python进行数据分析》第一版使用python2.7，出版于2012年

本书第二版使用python3.6，编写于2016年~2017年，针对pandas库的新特征进行更新

目前的笔记依赖于第三版，编写于2022年，并对pandas库的新特征进行更新

第三版在项目上尽可能与前两版保持一致，但是在细节有一些优化；同时第三版最大的一处变化是开放了[在线版本](https://wesmckinney.com/book/)，并通过git版本控制进行持久维护，查缺补漏（给作者点个赞）。

本书中所有涉及的代码和数据也都可以在[Github项目](https://github.com/wesm/pydata-book)或[Gitee项目](https://gitee.com/wesmckinn/pydata-book)中找到

在前言部分，作者也致敬和感谢了很多曾经激励或帮助他本人的机构与伙伴

### 1 本书主要内容

介绍Python编程和用于数据处理的库和工具环境

深入说明通过Python进行数据控制、处理、整理、分析等要点与细节

本文主要需要处理的是结构化数据（structured data），包括但不限于表格型/关系型数据、多维数组、多表关联、时间序列。数据类型也以字符串、数字化、日期为主

### 2 Python的特性

Python的优势

- 数据科学、机器学习、软件开发等领域，都具备规模庞大并且活跃的社区
- 在数据分析、交互式计算以及数据可视化方面，也具备强大而优秀的性能
- 作为一种胶水（Glue）语言，Python能很好地衔接不同的语言或软件系统
- Python很适合科研领域研究与测试，在工业的生产开发也具备不俗的实力

Python的不足：

- 作为一种解释型编程语言，天然的比编译型语言运行慢
- 由于全局解释器锁（Global Interpreter Lock，GIL）的存在，Python不适合高并发多线程的场景

### 3 Python的常用库

Numpy：科学计算基础包，能高效地处理数组与相关的数学运算

pandas：本书的重点研究工具，兼具Numpy的高性能和类似Excel的灵活性

matplotlib：图表绘制基础包，常作为数据可视化工具的首选

IPython和Jupyter：交互式的Python编程，更符合数据分析与探索的实战场景

SciPy：处理科学计算的常用包，包含微积分、最优化、统计检验等功能

scikit-learn：通过机器学习工具包，内置大量常用的机器学习算法

statsmodels：统计分析包，包含很多经典统计学和经济计量学的算法

### 4 Python的安装与配置

不同系统下的Python安装：略

Python包的安装或升级使用`conda`或`pip`：细节略

> 入门推荐直接安装Miniconda或Anaconda，更多细节可查阅Anaconda基础知识

集成开发环境（IDEs）和文本编辑器：PyDev（免费）、PyCharm（个人开发者免费）、Visual Studio（免费，个人推荐）、Spyder（免费，Anaconda自带）、Komodo IDE（付费）

### 5 社区和会议

常见社区：

- pydata：和Python数据分析或pandas相关
- pystatsmodels： 和statsmodels或pandas相关
- scikit-learn和Python机器学习相关[组织列表](https://www.python.org/)
- numpy-discussion：和NumPy相关
- scipy-user：和SciPy和科学计算相关

常见会议：

- PyCon和EuroPython：北美和欧洲的两大Python会议
- SciPy和EuroSciPy：北美和欧洲两大科学计算的相关会议
- PyData：世界范围内，专注数据科学和数据分析的地区性会议
- 国际和地区的PyCon会议[完整列表](http://pycon.org/)

### 6 本书导航

本书第2~3章，主要介绍Python的特点，IPython和Jupyter notebooks。非初学者可选择性跳过

常见术语：数据规整（Munge/Munging/Wrangling）、伪代码（Pseudocode）、语法糖（Syntactic sugar）

## Python基础、IPython与Jupyter

提示：本书定位是专注于数据处理与分析的工具书，不涉及类和面向对象编程等概念

所以作者也推荐了三本进阶书籍：《Python Cookbook》《Fluent Python》《Effective Python》

> 此处加一个 #待补充 方便以后提醒自己阅读这三本书

### 1 Python解释器

打开解释器：在终端输入`python`（没反应请检查一下环境变量配置）

退出解释器：输入`exit()`或快捷键`ctrl+D`

执行python脚本：`python xxxxx.py`

### 2 IPython基础

交互式编程：在终端输入`ipython`（可能需要安装ipython包，但anaconda自带）

运行notebook：在终端输入`jupyter notebook` （可能需要安装，但anaconda自带）

notebook是Jupyter项目的重要组件之一，内置后端服务并基于浏览器进行交互式编程，在数据分析和可视化的时候非常方便，同时也适合在服务器中部署并进行远程访问。

notebook常用技巧：

- tab键自动补全功能
- 变量前后添加问号？显示对象的信息
- 函数前后添加两个问号？？显示源码
- `%run`命令在ipython中运行Python脚本
- `%load`命令可以将Python脚本内容导入ipython
- `%matplotlib inline`设定画图自动显示（否则需要手动执行`plt.show()`）
- 除此之外，notebook还有很多快捷键和魔术命令

关于Jupyter项目和notebook技巧的更多细节可参阅[7_software/Jupyter/Jupyter 基础知识](https://banxian-w.com/article/2023/3/24/Jupyter%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86)

### 3 Python语法基础

Python的语法特点：简洁、清晰、高可读

- 使用空白字符（tab和空格都可以，但个人推荐前者）来组织代码
- 万物皆对象，包括函数、字符串等都有各自的类型和内部数据，非常灵活
- 使用`#`进行注释的表示；使用`=`进行赋值操作
- 函数调用：`obj.some_method(x, y, z)`
- 参数类型：`result = f(a, b, c, d=5, e=["ok",'hi'])`
- 动态类型，不需要显式声明类型；可以使用`isinstance`检查类型一致性
- 不关注类型而更关注方法：鸭子类型（“走起来像鸭子、叫起来像鸭子，那么它就是鸭子”）
- 使用`from ... import`或`import`进行引用其他文件或模块
- 常见比较运算符；`==`是判定值是否相同，`is`方法判定是否指向同一个对象
- 可变与不可变对象：不可变对象内容不容易被修改，更安全但不灵活

类型相关语法

- 常见标量类型及其类型转换：None、str、bytes、float、bool、int
- 常见数值运算和字符串操作：`//`整除、`count`计数、`replace`替换、`[:2:-2]`切片、`\`转义
- 使用`format`进行输出格式规范：`{0:.2f}`
- 编码`encode`与解码`decode`，常见编码格式：ASCII、Unicode、UTF-8
- `None`：空值类型，NoneType的唯一实例，常作为参数的默认值
- 字符串与日期间的转换：`datetime`、`date`、`time`、`strptime`、`strftime`

控制流相关语法

- 条件判断：`if`、`elif`、`else`、`pass`
- 循环：`for`、`while`、`continue`、`break`、`range`

## Python数据结构、函数和文件

### 1 数据结构和序列

元组`tuple`，小括号定义，固定长度，不可变的Python序列对象

> 在Python的函数中，参数传入以及结果返回都是以元组的形式实现的

列表`list`，方括号定义，长度可变，内容可变的Python序列对象

常用的序列函数

- `enumerate()`示例：`for i, value in enumerate(tuple_or_list)`
- `sort()`：对序列或字符串进行排序
- `zip()`：对多个序列进行成对地组合（最终长度取决于最短的输入序列）
- `reversed()`：生成器，从后向前地迭代一个序列

字典`dict`（重要），大括号定义，以键值对的形式存储一系列Python对象

- `keys`和`values`是字典的键和值的迭代器方法
- 两个字典可以通过`update`进行融合
- `setdefault`方法可以设置默认值，或者直接使用带默认值的字典格式`defaultdict`
- 字典的值可以是任意Python对象，但键必须要是”可哈希的“（可以使用`hash`函数来检测一个对象是否是可哈希的/可被作为字典的键，比如列表就是不可以的）

集合`set`，无序的不可重复的元素集合，支持常见的数学集合操作（交并补）

> 通过将列表等序列对象转换为集合，可快速实现去重的效果

常见推导式（Comprehensions）：

`# 列表推导式
[expr for value in collection if condition]
# 字典推导式
set_comp = {expr for value in collection if condition}
# 集合推导式配合map函数
set(map(len, strings)) # 计算每个字符串的长度
# 嵌套推导式
result = [name for names in all_data for name in names if name.count('e') >= 2]`

> 建议熟练地掌握以上数据结构相关的增删改查、切片、拼接、排序、格式转换等技巧

### 2 函数

基本结构：

`def my_function(x, y, z=1.5):
    if z > 1:
        return z * (x + y)
    else:
        return z / (x + y)`

- 其中`x`和`y`是位置参数，`z`是可选参数
- 在一些不需要返回的函数中，`return`可以忽略
- `return`结果可以为空，也可以是多个值（会被拼接为元组返回）

Python通过命名空间（namespace）限制变量的作用域

- 函数中定义的变量都被分配到局部命名空间中，不可在外部被访问
- `global`关键字可以在函数内定义全局变量（一般不推荐使用，容易乱）

对于一次性的简单函数，可以使用匿名（lambda）函数：

`def apply_to_list(some_list, f):
    return [f(x) for x in some_list]

ints = [4, 0, 1, 5, 6]
apply_to_list(ints, lambda x: x * 2)`

Python中的许多对象（如列表或字典）都支持迭代，生成器（generator）是构造可迭代对象常用方法：

`def squares(n=10):
    print('Generating squares from 1 to {0}'.format(n ** 2))
    for i in range(1, n + 1):
        yield i ** 2 # 将函数中的return替换为yeild，便可创建一个生成器`

另一种构造生成器的简洁方法是使用生成器表达式（generator expression）：

`gen = (x ** 2 for x in range(100))
gen
# <generator object <genexpr> at 0x7fbbd5ab29e8>`

> Python内置标准库中的itertools模块，包含了很多用于常见算法的生成器

Python捕捉异常的语法：

`f = open(path, 'w') # 创建文件对象（只写模式）

try:
    write_to_file(f)
except:
    print('Failed')
else:
    print('Succeeded')
finally:
    f.close() # 关闭文件并释放资源`

文件处理的常用模式：`r`只读模式、`w`只写模式（已存在文件会被覆盖）、`x`只写模式（存在文件时会失败）、`a`追写模式、`r+`读写模式、`b`声明为二进制文件（可配合其他模式，如`wb`，`rb`）

文件处理的常用方法：`read`读取、`readable`判断是否可读、`readlines`按行读取、`write`写入、`writable`判断是否可写、`writelines`按行写入、`close`关闭文件、`flush`清空内部IO缓存并写回磁盘、`seek`移动到文件的指定位置、`seekable`判断是否可移动、`tell`以整数形式返回文件位置、`closed`判断是否已关闭、`encoding`指定解码格式

> 注意区分文件的编码格式，对症下药；可通过sys.getdefaultencoding()检查默认的编码格式

## numpy基础：数组和向量计算

NumPy（Numerical Python）是Python用于数值计算的基础包

- 内置高效的多维数组`ndarray`，提供快速向量计算和灵活的广播机制
- 具备常见的数学计算函数（线性代数、傅里叶变换等）和读写数据的能力
- 在一个连续的内存块中存储数据，节省内存并且计算效率高
- 提供动态、易用的接口，也很方便与其他常用编程语言对接

> 关于广播机制可参阅1.3 广播机制

### 1 多维数组

`ndarray`数组是一个通用的同构数据多维容器，即所有元素的类型应该是相同的

数组基本操作：

`import numpy as np # 库重命名

data = np.random.randn(2, 3) # 随机生产2*3的数组
data = data * 10 + data # 基本向量运算
data.shape # 查看数组维度
data.dtype # 查看元素类型
data.astype(str) # 转换元素类型
data = np.array([[1, 2, 3], [6, 7, 8]]) # 列表转数组
data[2:,:-1].copy() # 支持灵活的切片操作（第2行以后，倒数第1列之前）
data[~(data < 6)] = 1 # 过滤与复制，~用来表示非这一逻辑操作`

> 细节补充：
> 1. 尽量不要在numpy中使用`str`格式，因为其内部空间是固定的，所以可能出现数据截断的问题
> 2. 当数据与指定格式不兼容时，`astype`可能会报错；转换成功后会生成一个新对象（即使格式前后一样）
> 3. 数组的切片操作其实是一种视图，并不会复制数据（减少内存负担），使用`copy()`可以显式复制数据
> 4. Python在进行逻辑操作时会使用`and`和`or`等关键字，但在数组中要使用`&`和`|`来实现

内置函数用于便捷地生成矩阵：`ones` 全1矩阵、`zeros` 全0矩阵、`empty` 空矩阵、`eye` 单位矩阵

数组操作常用：

`dara.T # 数组转置
data.reshape((3,2)) # 数组维度变换
np.dot(data.T, data) # 计算矩阵点积
arr = np.arange(16).reshape((2, 2, 4))
arr.transpose((0, 2, 1)) # 轴变换（2轴变3轴，3轴变2轴）
arr.swapaxes(1, 2) # 指定两个轴进行转置（也是视图操作）`

### 2 伪随机数生成

`# 从标准正态分布中得到一个4 × 4的样本数组
samples = np.random.standard_normal(size=(4, 4))
new_samples = np.random.permutation(samples) # 随机打乱
np.random.shuffle(samples) # 原地随机打乱`

> 除了标准正态分布，numpy的随机生成还支持uniform均匀分布、integers整数随机、binomial二项分布、normal普通正态、beta贝塔分布、chisquare卡方分布、gamma伽马分布

> numpy的随机数是基于生成器种子进行的伪随机，可通过seed固定随机种子，方便结果的复现

### 3 数组相关通用函数

通用函数（Universal Functions，简称ufunc）是指针对数组每个元素进行运算的函数（矢量化运算）

常见一元ufunc：`abs` 绝对值、`fabs` 绝对值（对于非复数，更快）、`sqrt` 开方、`aquare` 平方、`exp` 指数、`log,log10,log2` 不同底数的对数（默认为e）、`sign` 正负号、`ceil` 向上取整、`floor` 向下取整、`modf` 切分整数和小数部分、`isna` 判断是否为空、`isinf` 判断是否为无穷、`sin,cos,tan,sinh,cosh,tanh` 常见三角函数

常见二元ufunc（输入项为两个数组）：`add` 元素相加、`subtract` 元素相减、`multiply` 元素相乘、`divide` 元素相除、`floor_divide` 元素整除（丢弃余数）、`power`底数^指数、`maximum,fmax` 比较取最大、`minimum,fmin` 比较取最小、`mod` 求模（取余数）、`copysign` 元素替换（后者替代前者）、`>,<,==,!=,` 逻辑运算

### 4 数组相关数据分析

用数组表达式代替循环的做法被称为矢量化（vectorization），相比于循环效率会高很多

`# 数据初始化
xarr = np.array([1.1, 1.2, 1.3, 1.4, 1.5])
yarr = np.array([2.1, 2.2, 2.3, 2.4, 2.5])
cond = np.array([True, False, True, True, False])

# 按照条件筛选两组数据
result = [(x if c else y) for x, y, c in zip(xarr, yarr, cond)]
# 数组的矢量化等价写法
result = np.where(cond, xarr, yarr)`

常用聚合计算：`mean`均值、`var,std`方差/标准差、`sum`求和、`cumsum`累积加、`cumprod`累积乘、`min`最小值、`max`最大值、`argmin`最小值对应位置、`argmax`最大值对应位置、`any`数组内元素`or`运算、`all`数据内元素`and`运算

> 聚合运算可以通过参数axis指定轴，以进行不同维度的聚合

集合相关运算：`sort`排序、`unique`去重、`intersect1d(x,y)`计算x和y的公共元素并排序、`union1d(x,y)`计算x和y的并集并排序、`in1d(x,y)`判断x中元素是否属于y、`setdiff1d(x,y)`在x中且不属于y的元素、`setxor1d(x,y)`在其中一个数组中存在且不同时存在于两个数组的元素

### 5 数组的存储与读取

数组的存储与读取示例：

`arr = np.arange(10)
np.save('some_array', arr) # 普通存储
np.load('some_array.npy') # 普通读取
np.savez('array_archive.npz', a=arr, b=arr) # 多数组存储
np.load('array_archive.npz')['b'] # 多数组读取
np.savez_compressed('arrays_compressed.npz', a=arr, b=arr) # 多数组压缩存储`

### 6 数组与线性代数

矩阵乘法示例：

`x = np.array([[1., 2., 3.], [4., 5., 6.]])
y = np.array([[6., 23.], [-1, 7], [8, 9]])

x.dot(y) # 矩阵乘法 写法1
np.dot(x,y) # 矩阵乘法 写法2
x @ np.ones(3) # 矩阵乘法 写法3`

其他常用矩阵运算：`diag`获取对角线元素、`trace`对角线求和、`det`计算行列式、`eig`计算特征值和特征向量、`inv`矩阵求逆、`pinv`广义逆矩阵（伪逆）、`qr`正交三角分解、`svd`奇异值分解、`solve`求解线性方程组、`lstsq`计算Ax = b最小二乘解

### 7 案例：随机游走

纯Python实现一次随机游走：

`import random
position = 0
walk = [position]
steps = 1000
for i in range(steps):
    step = 1 if random.randint(0, 1) else -1
    position += step
    walk.append(position)`

numpy实现一次随机游走：

`nsteps = 1000
draws = np.random.randint(0, 2, size=nsteps)
steps = np.where(draws > 0, 1, -1)
walk = steps.cumsum()`

numpy实现5000次随机游走：

`nwalks = 5000
nsteps = 1000
draws = np.random.randint(0, 2, size=(nwalks, nsteps)) # 0 or 1
steps = np.where(draws > 0, 1, -1)
walks = steps.cumsum(1)`

## pandas入门

pandas是后续数据清理和分析的重要工具

pandas是基于numpy构建的，但支持异构的数据（不同于numpy，pandas中不同列的类型可以是多样化的，比如日期、数值、字符串等）。pandas的功能定位可以对标Excel，但相比于Excel会更加地灵活强大

### 1 pandas数据结构介绍

pandas包含两个主要数据结构：Series和DataFrame

Series是一种类似于一维数组的对象，包含了列表、字典或一维numpy数组的很多特性；每个Series都是由一个名称（name）、一组index和一组values构成；Series内的元素类型应该是相同的

DataFrame则是以二维结构来存储数据，多个Series则构成了一个DataFrame，每个Series对应一列，Series的名称对应列名，Series内的索引对应行索引；不同Series间的类型可以是不同的，但不同Series会共享一套索引

Series操作示例：

`import pandas as pd
from pandas import Series, DataFrame
obj = pd.Series([4, 7, -5, 3], index=['d', 'b', 'a', 'c'])
obj.index # 查看Series的索引
obj.values # 查看Series的值
obj.name='exam' # Series的名称赋值
obj[['c', 'a', 'd']] # 行筛选
obj[obj2> 0] # 逻辑筛选

pd.Series({'Ohio': 35000, 'Texas': 71000}) # 字典转换为Series
obj.to_dict() # Series转换为字典
pd.isnull(obj) # 对每个元素进行缺失判断`

> Series的索引非常灵活，默认是整数，也可以是其他格式（字符串、日期）

DataFrame操作示例：

`data = {'state': ['Ohio', 'Ohio', 'Ohio', 'Nevada', 'Nevada', 'Nevada'],
        'year': [2000, 2001, 2002, 2001, 2002, 2003],
        'pop': [1.5, 1.7, 3.6, 2.4, 2.9, 3.2]}
frame = pd.DataFrame(data) 
frame.head() # 查看前五行
frame.tail(3) # 查看后三行
frame['state'] # 筛选列，等价于frame.state
del frame['pop'] # 删除一列
frame.columns # 查看列名
frame.index # 查看行索引
frame.values # 查看数据（返回二维数组结构）
frame.loc[1,'year'] # 筛选，行索引=1，列名=year
frame.iloc[1,2] # 筛选，第2行第3列
frame.T # 行列转置
"Ohio" in frame.columns # 判断是否存在名为Ohio的列
203 in frame.index # 判断是否存在名为203的索引`

> pandas的筛选一般也是视图操作，不会复制数据（节省内存），copy()可主动复制数据
> 行索引应该具备唯一性，确定后会转换为不可变对象（安全）在不同Series间共享
> 
> 类似于一维数组，行索引也可以进行很多操作，比如`append`拼接、`intersection/union/difference/`交并补、`delete/drop`删除、`insert`添加、`unique`去重、`is_unique`是否没有重复值、`is_monotonic`是否递增

### 2 基本功能

常用基本方法

- `reindex`指定新的行索引或新的列名/列索引（`axis=0`指定行，`axis=1`指定列）
- `drop`弃置行列（也可以是某几行或某几列，`axis=0`指定行，`axis=1`指定列）
- 使用切片（如`df[2:4]`）和逻辑运算（如`df[df < 5]`）进行更复杂的赋值/筛选/过滤
- 用`loc`（输入为行索引和列名/列索引）和`iloc`（输入为行数和列数）进行更精细化的筛选
- 索引对齐，两个DataFrame相加/减时，会自动根据索引（包括行索引和列名/列索引）进行对齐然后再加/减；这种操作可能（索引无法对齐的时）会导致结果存在缺失，可考虑借助参数`fill_value`填充缺失
- DataFrame和Series之间的算术运算也会支持广播机制（参数`axis`指定按行或列广播）
- 使用`sort_inedx`按照索引（也支持列名/列索引）排序，使用`sort_values`按照值排序（对于DataFrame可指定是哪一列的值）；参数`ascending`控制是否为升序；参数`na_position`控制缺失值的位置
- 使用`rank`返回排序结果的次序（不会打乱原始数据），可指定多种次序的确定方法

> Python内置的整数索引和panda存在冲突，因此推荐在pandas内使用loc和iloc进行索引操作
> pandas的索引并不强制要求唯一性，但重复索引会为数据清洗和分析带来不必要的麻烦

注意尽量避免存在链式索引的写法：

`data.loc[data.three == 5]["three"] = 6 # 链式索引
# 此时程序会警告：SettingWithCopyWarning
# 提示你正在一个尝试修改一个临时值，原始数据不会被修改
data.loc[data.three == 5, "three"] = 6 # 正确写法`

Numpy中的通用函数（ufuncs）也同样适用于操作pandas对象：

`frame = pd.DataFrame(np.random.randn(4, 3), columns=list('bde'),
    				 index=['Utah', 'Ohio', 'Texas', 'Oregon'])
np.abs(frame) # 使用ufuncs计算绝对值
frame.apply(lambda x: x.max() - x.min(), aixs=1) # 每列最大值-最小值，返回Series
frame["Ohio"].map(lambda x: x:.2f) # 返回输出格式调整后的Ohio列（Series）
frame.applymap(lambda x: x:.2f) # 返回输出格式调整后的ataFrame`

- DataFrame使用`apply`实现对行或列的函数应用
- Series使用`apply`或`map`实现对每个元素的函数应用
- DataFrame使用`applymap`实现对每个元素的函数应用

### 3 绘制和描述统计

numpy的很多聚合计算也继承到了DataFrame中：

`df.sum(skipna=False) # 按列求和
df.sum(axis=1) # 按行求和
df.mean(axis='columns', skipna=False) # 按行求和，忽略缺失值
df.idxmax() # 按列计算最大值对应的行索引
df.argmin() # 按列计算最小值对应的行索引位置（整数）
df.cumsum() # 按列计算累加
df.describe() # 直接返回多种统计值的汇总`

其他DataFrame常用的聚合函数：`count`计数、`quantile`分位数、`mad`平均绝对偏差、`prod`所有值的乘积、`skew`偏度、`kurt`峰值、`cumpord`累加乘、`cummin, cummax`累加最小/大值、`diff`差分、`pct_change`百分比变化

其他描述统计常用函数：`corr`相关系数、`cov`协方差、`corrwith`批量计算Series与DataFrame间的相关系数、`unique`唯一值、`value_counts`按照值统计词频、`isin`是否包含、`match`返回两数组匹配后的索引对齐情况

## 数据加载与存储

### 1 读写文本格式的数据

常见读取函数： | 函数名称 | 简单描述 | | ---------------- | ------------------------------------------------------------- | | `read_csv` | 从文件、URL、文件型对象中加载带分隔符的数据，默认分隔符为逗号 | | `read_fwf` | 以固定列宽度的格式读取数据 | | `read_clipboard` | 从剪切板以`read_csv`的方式读取数据，常用于解析网页中的表格 | | `read_excel` | 从后缀为.xls或.xlsx的表格文件中读取数据 | | `read_hdf` | 读取pandas存储（`save_hdf`）的HDF5格式的数据 | | `read_html` | 给定HTML文档，读取其中所有的表 | | `read_json` | 从文件、URL、文件型对象中读取数据，并安装JSON格式解析 | | `read_feather` | 读取Feather二进制文件 | | `read_orc` | 读取Apache ORC二进制文件 | | `read_parquet` | 读取Apache Parquet二进制文件 | | `read_pickle` | 读取pandas存储（`save_pickle`）的pickle格式的数据 | | `read_sas` | 读取SAS软件输出的存储格式 | | `read_spss` | 读取SPSS软件输出的存储格式 | | `read_sql` | 读取SQL查询的结果(使用SQLAlchemy) | | `read_sql_table` | 读取整个SQL表(使用SQLAlchemy) | | `read_stata` | 读取Stata格式的文件 | | `read_xml` | 读取XML格式的文件 |

`read_csv`是最常用的读取方式，其常见参数如下：

- 使用`sep`或`delimmiter`可指定分隔符，进行灵活的数据解析
- 参数`header`用于指定读取时将第几行内容作为列名称，默认为`0`，没有则为`None`
- 参数`index_col,names`直接接收一组数据，作为行索引或列名/列索引
- `skiprows`指定读取时忽略前几行，默认是0；`nrows`从第几行开始读取
- `na_values`指定缺失的默认填充值；`encoding`指定解码格式
- `parse_dates`用于智能解析日期型的列；`date_parser`指定解析日期的方法
- `chunksize`指定迭代读取时的块大小，避免大量数据的一次性载入
- 其他参数（个人觉得没那么常用）可参阅pandas的[官方API文档](https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html)

> read_csv主要通过给定的间隔符进行数据的解析，在实际应用中，数据的杂质与畸变可能导致读取出现问题，此时可以考虑借助Python内置的csv.reader函数在数据读取前进行更精细化的清洗
> 针对Web信息，最常用的存储形式是`HTML`和`XML`，这些格式pandas也都是可以直接支持的（可能需要安装第三方依赖包`pip install lxml`），此外也可以参阅本人之前总结的[Python读取xml文件](https://banxian-w.com/article/2021/9/28/1769.html)

### 2 二进制数据格式

pickle序列化是Python内置的二进制存储格式：

- 能实现数据的高效存储`to_pickle`与读取`read_pickle`
- pickle格式是Python的独有格式，支持存储Python内的所有常见对象
- 长期来看，pickle格式不同版本间容易出现兼容问题，因此仅推荐作为短期存储格式

对于微软的Excel表格文件，pandas也是支持读写的

- 对于旧版本的`.xls`后缀的表格文件，pandas可能需要安装第三方包`xlrd`
- 对于旧版本的`.xlsx`后缀的表格文件，pandas可能需要安装第三方包`openpyxl`

> 除pickle和excel外，pandas也支持其他常见的数据格式，比如HDF5、Parquet等，本书原文对这些方式也进行的较为详细的说明，但此处不再赘述。因为本人之前也针对这几种存储形式（包括csv和json），在耗时和压缩比等方面进行了详细的对比，具体可参考Python常见数据存储方式对比

### 3 与网页API交互

Python中一般使用`requests`库进行网页交互

一个网页API交互的简单示例：

`import requests

url = 'https://api.github.com/repos/pandas-dev/pandas/issues'
resp = requests.get(url) # 向指定网页发送GET请求
resp.raise_for_status() # 解析网页返回的状态码，200表示成功
resp.json() # 解析网页返回的JSOn格式数据（需要提前确定返回的格式）`

## 数据清洗和准备

### 1 处理缺失数据

pandas沿用了R语言中的习惯，将缺失值表示为NA（not available）

- Python内置的None也可以作为NA
- 对于浮点型数据来说，也会用NaN（Not a Number）表示缺失

处理缺失的代码示例：

`string_data = pd.Series(["aardvark", np.nan, None, "avocado"])
string_data.isna() # 判断是否为缺失值
# 结果是 False True True False
string_data.dropna() # 直接丢弃存在缺失的数据

data = pd.DataFrame([[1., 6.5, 3.], [1., np.nan, np.nan],
                      [np.nan, np.nan, np.nan], [np.nan, 6.5, 3.]])
data.dropna(how="all") # 当一行的数据全是缺失时才舍弃这一行
data.dropna(axis=1, thresh=2) # 当一列的数据缺失量大于2时才舍弃这一列
data.fillna(0) # 填充缺失为0
data.fillna({1: 0.5, 2: 0}) # 第2列使用0.5填充缺失；第3列使用0填充缺失
data.fillna(method="bfill") # 使用向前填补的方式填充缺失
data.fillna(method="ffill", limit=2) # 使用向后填补的方式填充缺失，最多插值2此
data[0].fillna(data[0].mean()) # 第一列按照均值填充缺失`

### 2 数据转换

处理数据重复的代码示例：

`data = pd.DataFrame({'k1': ['one', 'two'] * 3 + ['two'],
                      'k2': [1, 1, 2, 3, 3, 4, 4]})
data.duplicated() # 判断各行是否是重复行
data.drop_duplicates() # 舍弃重复行
data.drop_duplicates(['k1']) # 指定部分列进行重复项判断
data.drop_duplicates(['k1', 'k2'], keep='last') # 出现重复时保留最后一个`

常见数据转换的代码示例：

`data = pd.DataFrame({'food': ['bacon', 'pulled pork', 'bacon',
                               'Pastrami', 'corned beef', 'Bacon',
                               'pastrami', 'honey ham', 'nova lox'],
                      'ounces': [4, 3, 12, 6, 7.5, 8, 3, 5, 6]})
meat_to_animal = {
  'bacon': 'pig','pulled pork': 'pig',
  'pastrami': 'cow','corned beef': 'cow',
  'honey ham': 'pig','nova lox': 'salmon'
}
# 将字符串处理为小写，并根据字典进行值的映射与转换
data['animal'] = data['food'].str.lower().map(meat_to_animal)
data['animal'] = data['food'].map(lambda x: meat_to_animal[x.lower()]) # 另一种写法
# 使用rename可以对行索引或列索引/列名进行重命名或映射转换
data = data.rename(index=['a1','a2','a3','a4','a5','a6','a7','a8','a9'])
data.rename(index={'a1': 'A1'}, columns={'food': 'Food'}, inplace=True) # 原地修改
# 使用cut将连续型数据转化为离散型数据
ages = [20, 22, 25, 27, 21, 23, 37, 31, 61, 45, 41, 32]
bins = [18, 25, 35, 60, 100]
cats = pd.cut(ages, bins)
cats.codes # 结果是[0, 0, 0, 1, 0, 0, 2, 1, 3, 2, 2, 1]
pd.cut(data, 4, precision=2) # 另一种离散化方式，直接指定桶数=4，分桶区间长度是一致的
pd.qcut(data, 4, precision=2) # 根据样本分位数进行离散化，分桶区间长度一般是不一致的`

> cut函数返回一个Categorical对象，bins对于着数据的分桶，value_counts就是针对分桶的计数；每个桶的区间一般的前闭后开的，上文代码示例对应的分桶区间是[[18, 25) < [25, 35) < [35, 60) < [60, 100)]

异常值的发现与处理：

`data[2][np.abs(data[2]) > 3] # 筛选第3列数据中绝对值大于3的
data[np.abs(data) > 3] = np.sign(data) * 3 # 将数据的绝对值限制在3以内
data.replace(-999, np.nan) # 将异常值进行批量替换
data.replace({-999: np.nan, -1000: 0}) # 针对不同异常值进行个性化处理`

其他常用的数据转换方法：

- 使用`numpy.random.permutation`函数对数据进行随机重排序
- 使用`sample`方法在Series和DataFrame上选取随机子集
- 使用`pandas.get_dummies`函数对类别型变量进行[哑变量处理](https://banxian-w.com/article/2021/9/28/1775.html)

### 3 扩展数据类型

pandas构建在numpy的基础之上，这可能存在一些缺点：

- 对于数值型缺失，需要用`np.nan`额外兼容（并且还存在隐患）
- 当数据集中存在大量字符串时，计算成本高，内存占用大
- 为了兼容特殊的数据类型（如时间间隔、带时区的时间戳等）需要付出额外的代价

pandas引入了扩展类型（extension type），用来灵活兼容更多地类型

`pd.Series([1, 2, 3, None]) # 老版（float64），缺失值用NAN表示
pd.Series([1, 2, 3, None], dtype=pd.Int64Dtype()) # 新版，缺失值用NA表示
pd.Series([1, 2, 3, None], dtype=pd.Int64()) # 新版，类型简写的形式
pd.Series(['one', 'two', None, 'three'], dtype=pd.StringDtype()) # 扩展版字符串`

其他常用的扩展类型：`BooleanDtype`、`CategoricalDtype`、`DatetimeTZDtype`、`Float32Dtype`、`Float64Dtype`、`Int8Dtype`、`Int16Dtype`、`Int32Dtype`、`UInt8Dtype`、`UInt16Dtype`、`UInt32Dtype`、`UInt64Dtype`

> 一般扩展类型会使用首字母大写的形式，以方便与老版的类型区分
> 基于扩展类型构建的类型（如字符串）一般计算效率更高，内存占用更少

### 4 字符串操作

字符串中子字符串的查找：

- 直接使用`in`关键字，可以判断是否存在相应的子字符串
- `index`查找（找不到会报异常，否则返回第一个的起始索引）
- `find`查找（找不到会返回-1，否则返回第一个的起始索引）
- `rfind`查找（找不到会返回-1，否则返回最后一个的起始索引）

其他常见字符串操作：`split`切分、`strip/rstrip/lstrip`去除空白符、`join`拼接、、`count`计数、`replace`替换、`lower`小写、`upper`大写、`startswith`以xxx开始，`endswith`以xxx结束，`ljust/rjust`左右对齐

正则表达式相关内容可参阅本人之前的总结：[正则表达式](https://banxian-w.com/article/2022/9/24/1773.html)

在pandas中，通过Series的str属性可访问字符串的矢量化方法：

`data = pd.Series({"Dave": "dave@google.com", "Steve": "steve@gmail.com",
         "Rob": "rob@gmail.com", "Wes": np.nan})
data.str.contains("gmail") # 是否包含某些关键字
data.str.findall(pattern, flags=re.IGNORECASE) # 矢量化的正则匹配
data.str.extract(pattern, flags=re.IGNORECASE) # 基于正则的文本抽取`

刚刚提到的几个字符串操作基本都是支持矢量化的，除此之外常用的还有：`cat`拼接字符串、`len`计算长度、`repeat`重复、`islower/isdigit/isdecimal/isnumeric`常见类型的判断、`slice`切片

### 5 类别型数据

之前已经提到了两个类别型数据常用的函数：`unique`和`value_counts`

用整数表示的类别型数据可以借助`take`方法转化为和文本类别型：

`values = pd.Series([0, 1, 0, 0])
dim = pd.Series(['apple', 'orange'])
dim.take(values)
# 结果是apple orange apple apple`

类别型数据一般存在大量的重复值，扩展类型`Categorical`针对此现象进行了数据压缩，大幅减少了类别型数据的内存占用和计算成本（特别是针对文本类别型）：

`# 定义扩展类型Categorical的两种方式
my_categories = pd.Categorical(['foo', 'bar', 'baz', 'foo', 'bar'])
my_categories = pd.Series(['foo', 'bar', 'baz', 'foo', 'bar']).astype(Categorical)
# Categorical类型数据包含两部分：类型与编码后的数据
my_categories.categories, my_categories.codes
# Categorical类型可以直接借助类型，将编码后的数据转换回去
categories = ['foo', 'bar', 'baz']
codes = [0, 1, 2, 0, 0, 1]
pd.Categorical.from_codes(codes, categories)
# 对比Categorical类型与普通类别型的内存占用
labels = pd.Series(['foo', 'bar', 'baz', 'qux'] * (10_000_000 // 4))
labels.memory_usage(deep=True) # 结果是600000128
categories = labels.astype('category')
categories.memory_usage(deep=True) # 结果是10000540
# 对比Categorical类型与普通类别型的计算占用
%timeit labels.value_counts() # 840 ms +- 10.9 ms per loop
%timeit categories.value_counts() # 30.1 ms +- 549 us per loop`

> 除了整数和字符串，类别型变量的值也可以是其他不可变类型的值

类别型数据的方法示例：

`cat_s = pd.Series(['a', 'b', 'c', 'd'] * 2).astype('category')
cat_s = cat_s.cat.set_categories(['a', 'b', 'c', 'd', 'e']) # 修正类别的总数目
cat_s.value_counts() # 分类计数，其中e的计数是0
cat_s.cat.remove_unused_categories() # 剔除未在数据中出现的类别`

其他类别型数据的常用方法：`add_categories`增加类别、`as_ordered`含次序的类别、`as_unordered`不含次序的类别、`remove_categories`删除类别、`rename_categories`类别重命名、`set_categories`重置类别、`get_dummies`对类别进行哑变量处理

## 数据的联接、合并与重塑

### 1 层次化索引

层次化索引（hierarchical indexing）为pandas提供了一种以低维形式处理高维数据的方法

层次化索引的简单示例：

`data = pd.Series(np.random.randn(9),index=[['a', 'a', 'a', 'b', 'b', 'c', 'c', 'd', 'd'],
    									   [1, 2, 3, 1, 3, 1, 2, 2, 3]]) # 一个简单的双层索引示例
data.index
data['b':'c'] # 第一层索引选择
data.loc[:, 2] # 第二层索引选择
data.unstack() # 二层索引转一层（Series会重塑为DataFrame）
data.stack() # unstack的逆运算

frame = pd.DataFrame(np.arange(12).reshape((4, 3)), # 列索引也可以是多层的
                      index=[["a", "a", "b", "b"], [1, 2, 1, 2]],
                      columns=[["Ohio", "Ohio", "Colorado"],["Green", "Red", "Green"]])
frame.index.names = ["key1", "key2"] # 为每层行索引命名
frame.columns.names = ["state", "color"] # 为每层列索引命名
pd.MultiIndex.from_arrays([["Ohio", "Ohio", "Colorado"],
                          ["Green", "Red", "Green"]],
                          names=["state", "color"]) # 也可以单独创建多层索引，方便复用
### 多层索引的常用方法：
frame.index.nlevels # 查看索引的层级数
frame.swaplevel("key1", "key2") # 交换两层行索引
frame.sort_index(level=1) # 索引排序，仅按照第二层行索引排序
frame.groupby(level="key2").sum() # 指定行索引层级，并完成聚合运算
frame.sum(level='color', axis=1) # 指定列索引层级，并完成聚合运算

### 普通列与行索引之间的互转
frame = pd.DataFrame({'a': range(7), 'b': range(7, 0, -1),
                      'c': ['one', 'one', 'one', 'two', 'two','two', 'two'],
                      'd': [0, 1, 2, 0, 1, 2, 3]})
frame2 = frame.set_index(['c', 'd']) # 将普通列转化为行索引
frame2.reset_index() # 将行索引转化为普通列`

### 2 合并数据集

pandas中的常见的三种数据合并方式：

- `pandas.merge`指定一列或多列进行join操作（SQL常用）
- `pandas.concat`指定一个轴直接拼接多个DataFrame
- `combine_first`用一个DataFrame填充另一个的缺失值

`pandas.merge`简单使用示例：

`df1 = pd.DataFrame({'key': ['b', 'b', 'a', 'c', 'a', 'b'], 'data1': range(6)})
df2 = pd.DataFrame({'key': ['a', 'b', 'a', 'b', 'd'], 'data2': range(5)})
pd.merge(df1, df2, on='key', how='left') # 以key列为键进行左关联
pd.merge(df1, df2, left_on='data1', right_on='daat2', how='inner') # 内关联`

`pandas.merge`其他常用技巧：

- `pandas.merge`可以通过参数`left_index=True`或`right_index=True`指定行索引作为关联键
- 当两份数据存在名称重复的列时可以通过参数`suffixes`指定后缀，如`suffixes=['_left','_right']`
- 未指定关联键时，`pandas.merge`会自动选择所有名称重复的列作为关联键
- `pandas.merge`支持左（`left`）、右（`right`）、内（`inner`）、外（`outer`）关联
- 当索引为多层索引时，使用索引作为关联键相当于多个列作为关联键

`pandas.concat`简单使用示例：

`np.concatenate([arr, arr], axis=1) # 对于numpy数值可以这么拼接
s1 = pd.Series([0, 1], index=["a", "b"], dtype="Int64")
s2 = pd.Series([2, 3, 4], index=["c", "d", "e"], dtype="Int64")
s3 = pd.Series([5, 6], index=["f", "g"], dtype="Int64")
s4 = pd.concat([s1, s3]) # 直接行拼接

pd.concat([s1, s2, s3], axis="columns") # 列拼接多个DataFrame
pd.concat([s1, s4], axis="columns", join="inner") # 指定拼接方式为inner
pd.concat([s1, s1, s3], keys=["one", "two", "three"]) # 构建层次索引，区分三种来源`

`pandas.concat`其他常用技巧：

- 以上示例方法适用于DataFrame，只是拼接可选择的维度更多
- DataFrame行拼接时要注意忽略（`ignore_index=True`）或重置行索引

`combine_first`简单使用示例：

`a = pd.Series([np.nan, 2.5, np.nan, 3.5, 4.5, np.nan],
               index=['f', 'e', 'd', 'c', 'b', 'a'])
b = pd.Series(np.arange(len(a), dtype=np.float64),
               index=['f', 'e', 'd', 'c', 'b', 'a'])
b[-1] = np.nan
np.where(pd.isnull(a), b, a) # 直接填充缺失
# 结果 array([ 0. ,  2.5,  2. ,  3.5,  4.5,  nan])
a.combine_first(b) # 先根据索引对齐，再填充缺失
# 结果 Series([ 0.0,  4.5,  3.5, 0.0 , 2.5,  5.00])`

### 3 重塑和旋转

重塑多层次索引：`stack`对应“列转行”，`unstack`对应“行转列”

- 通过参数`level`来指定重塑第几层的索引
- 被`unstack`的行索引会转换到列索引的最底层
- `stack`操作默认会丢弃缺失的数据，可使用`dropna=False`保留

“宽格式”与“长格式”：

- 常见的Excel表格数据都是宽格式的，每一个变量单独成一列
- 长格式常用于存储时间序列，每一行代表着一个变量的一次观测

"宽转长"的代码示例：

`df = pd.DataFrame({'key': ['foo', 'bar', 'baz'],
                    'A': [1, 2, 3],
                    'B': [4, 5, 6],
                    'C': [7, 8, 9]})
melted = pd.melt(df, ['key']) # “宽格式”转为“长格式”
# melted 结果展示
#    key variable  value
# 0  foo        A      1
# 1  bar        A      2
# 2  baz        A      3
# 3  foo        B      4
# 4  bar        B      5
# 5  baz        B      6
# 6  foo        C      7
# 7  bar        C      8
# 8  baz        C      9
reshaped = melted.pivot(index="key", columns="variable", # 再转回去
    					values="value")
# reshaped 结果展示

# variable  A  B  C
# key              
# bar       2  5  8
# baz       3  6  9
# foo       1  4  7`

> pivot等价于使用set_index创建一个分层索引，然后调用unstack

## 绘图和可视化

### 1 matplotlib API入门

matplotlib的图像都是基于Figure对象

- `plt.figure()`可以创建一个空白的新Figure
- 通过Figure对象的属性实现对图片的调整（比如figsize控制图片大小）
- Figure对象可以通过`add_subplot`创建多子图，并可以依次进行绘制
- 直接调用绘图函数时，Figure对象等创建过程会在内部自动进行

代码示例：

`import matplotlib.pyplot as plt

plt.plot(np.arange(10)) # 绘制最简单的线图
fig = plt.figure() 
ax1 = fig.add_subplot(2, 2, 1) # 绘制2x2的多子图，初始化第一张
ax2 = fig.add_subplot(2, 2, 2) # add_subplot返回一个AxesSubplot对象
ax3 = fig.add_subplot(2, 2, 3) # AxesSubplot对象可以调用绘图方法进行绘制
# 第3张图：普通折线图（默认在最后一个AxesSubplot对象上绘制）
plt.plot(np.random.randn(50).cumsum(), 'k--') # k--表示黑色虚线
# 第1张图：普通直方图（bins指定桶数）
ax1.hist(np.random.randn(100), bins=20, color='k', alpha=0.3) # alpha指定透明度
# 第2张图：普通散点图（需要输入两列长度相同的数组）
ax2.scatter(np.arange(30), np.arange(30) + 3 * np.random.randn(30))

# 补充方法：一次性创建2x3的多子图画布
fig, axes = plt.subplots(2, 3, figsize=(8, 6)) # 指定图片尺寸为8x6
axes[0,1] # 表示第1行第2列对应的AxesSubplot对象`

绘图结果示例：

![](http://img.banxian-w.com/KG_ALLinOne/4_book/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/%E5%88%A9%E7%94%A8python%E8%BF%9B%E8%A1%8C%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/%E9%99%84%E4%BB%B6/Pasted%20image%2020230405233827.png)

> 在Jupyter Notebook中使用matplotlib时，可以通过%matplotlib inline命令设定绘制的图内嵌在页面里（默认是弹出一个图片窗口）；其次还需要注意将针对同一个图的绘图命令放在单个单元格中（因为在运行每个单元格后，绘图相关的内容将被重置）

matplotlib的完整图像类型可参阅[matplotlib官方绘图示例](https://matplotlib.org/)

其他绘图技巧：

- `subplots`方法通过参数`sharex`和`sharey`指定不同subplot共享相同的X轴或Y轴
- `subplots_adjust`方法可以调整不同subplot之间的（高/宽）间距
- 绘制图时可以通过参数`linestyle`、`color`等来控制绘图样式；参数`drawstyle`可以用来设置插值；多次绘图时可以通过参数`label`来进行区分（此参数一般会配合图例 legend 使用）；
- 绘制图时可以通过方法`legend`来启动图例，参数`loc`可以控制图例位置
- 绘制图时可以通过方法`xlim`来控制X轴范围，`set_xlabel`方法可以设置X轴名称；`set_title`方法可以设置绘图名称；`xticks`方法和`xticklabels`方法（参数`rotation`可以设置标签倾斜度，很实用）可以分别来控制X轴刻度值和刻度标签；以上方法通用适用于Y轴
- 绘制图时可以通过方法`text`，`arrow`和`annotate`来添加注解，参数`family`、`fontsize`等来控制字体样式；
- 绘制结果可以通过方法`savefig`进行保存，该方法会根据后缀名自动推断保存格式，也可以通过参数`format`手动指定格式；参数`dpi`用于指定保存图片的分辨率
- 绘图的配置信息会以字典的形式存储于`plt.rc`中，可调用`plt.rcdefaults`方法进行重置

代码示例：标准普尔500指数价格趋势与重要事件

`from datetime import datetime

fig, ax = plt.subplots()

data = pd.read_csv("examples/spx.csv", index_col=0, parse_dates=True)
spx = data["SPX"]

spx.plot(ax=ax, color="black")

crisis_data = [
    (datetime(2007, 10, 11), "Peak of bull market"),
    (datetime(2008, 3, 12), "Bear Stearns Fails"),
    (datetime(2008, 9, 15), "Lehman Bankruptcy")
]
for date, label in crisis_data:
    ax.annotate(label, xy=(date, spx.asof(date) + 75),
                xytext=(date, spx.asof(date) + 225),
                arrowprops=dict(facecolor="black", headwidth=4, width=2,
                                headlength=4),
                horizontalalignment="left", verticalalignment="top")

# Zoom in on 2007-2010
ax.set_xlim(["1/1/2007", "1/1/2011"])
ax.set_ylim([600, 1800])
ax.set_title("Important dates in the 2008-2009 financial crisis")`

绘图结果示例：

![](http://img.banxian-w.com/KG_ALLinOne/4_book/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/%E5%88%A9%E7%94%A8python%E8%BF%9B%E8%A1%8C%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/%E9%99%84%E4%BB%B6/Pasted%20image%2020230406000402.png)

### 2 使用pandas和seaborn绘图

在pandas中，Series和DataFrame都内置了一个用于生成各类图表的plot方法

- plot方法默认绘制折线图，也可以通过参数`kind`指定其他绘图类型（比如面积图`area`，柱状图`bar`，横向柱状图`barh`，密度图`density`，直方图`hist`，核密度估计图`kde`，折线图`line`，饼图`pie`）
- plot方法可以通过参数`ax`接收matplotlib的AxesSubplot对象，也支持相应的绘图属性（比如`alpha`，`figsize`，`title`，`xlim`，`legend`，`sharex`等）；通过参数`rot`旋转刻度标签；通过参数`grid`生成带网格的图像
- plot方法默认使用行索引作为横轴，可以通过参数`use_index`修改

代码示例：pandas绘制多个折线图

`df = pd.DataFrame(np.random.standard_normal((10, 4)).cumsum(0),
                   columns=["A", "B", "C", "D"],
                   index=np.arange(0, 100, 10))

plt.style.use('grayscale') # 修改绘图风格（灰度图，适配黑白打印的场景）
df.plot()`

绘图结果示例：

![](http://img.banxian-w.com/KG_ALLinOne/4_book/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/%E5%88%A9%E7%94%A8python%E8%BF%9B%E8%A1%8C%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/%E9%99%84%E4%BB%B6/Pasted%20image%2020230406003802.png)

> 在绘制柱状图时，可以通过参数stacked=True绘制堆叠柱状图；也可以通过.value_counts().plot.bar()绘制占比柱状图

seaborn是一个构建在matplotlib上的高级图形库，实现了更高效的可视化

关于seaborn的更多用法可参阅[1_study/Python/Module-seaborn-可视化/seaborn 快速入门](https://banxian-w.com/article/2023/4/5/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0-seaborn%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8)或[官方绘图示例](https://seaborn.pydata.org/examples/index.html)

### 3 其他Python可视化工具

静态绘图还是推荐本章提到的matplotlib或seaborn

交互式绘图可考虑 [Altair](https://altair-viz.github.io/)，[Bokeh](http://bokeh.pydata.org/)， [Plotly](https://plotly.com/python)

## 数据聚合与分组计算

### 1 分组机制

按照指定的行列取值进行分组，并按组进行计算（求和、均值、标准差等）

![[Notion/42向量/领域圣经/成长-关系-职场/assets/《10x Is Easier Than 2x》10倍比2倍容易/image 220.png]]

代码示例：

`df = pd.DataFrame({'key1' : ['a', 'a', 'b', 'b', 'a'],
                    'key2' : ['one', 'two', 'one', 'two', 'one'],
                    'data1' : np.random.randn(5),
                    'data2' : np.random.randn(5)})
grouped = df['data1'].groupby(df['key1']) # 生成一个GroupBy对象
grouped.mean() # 计算每组的均值（自动过滤无法计算均值的非数值列）
means = df["data1"].groupby([df["key1"], df["key2"]]).mean() # 两层分组
for name, group in df.groupby('key1'): # GroupBy对象支持迭代
     print(name)
     print(group)
pieces = {name: group for name, group in df.groupby("key1")} # 分组转dict

people = pd.DataFrame(np.random.randn(5, 5),
                       columns=['a', 'b', 'c', 'd', 'e'],
                       index=['Joe', 'Steve', 'Wes', 'Jim', 'Travis'])
people.iloc[2:3, [1, 2]] = np.nan # 混杂一些缺失值
mapping = {'a': 'red', 'b': 'red', 'c': 'blue',
            'd': 'blue', 'e': 'red', 'f' : 'orange'}
people.groupby(mapping, axis=1).sum() # 先映射再按照列进行聚合
people.groupby(len).sum() # 支持通过函数进行分组聚合`

其他分组聚类常用技巧：

- 分组所依赖的键在分组后会转化为索引，所以多分组的聚合运算结果会是多层次索引的
- 可以通过参数`as_index=False`显式地取消用于分组的键被用作索引
- 针对多层次索引，可以通过参数`level`指定根据具体哪一层进行分组
- 不同分组方式（列，索引，函数，映射序列）之间可以混合使用
- 多分组的结果会是多层次索引的形式，可以使用`unstack`或`reset_index`处理索引

### 2 数据聚合

常用聚合方法：`size/count`计数，`sum`求和，`min/max`最小值/最大值，`first/last`第一个/最后一个，`mean`均值，`median`中位数，`prod`积，`any/all`逻辑运算，`cummin/cummax/cumsum/cumprob`累积最小/最大/和/积，`quantile`分位数，`rank`次序，`std/var`标准差/方差，`nth`第N个数，`ohlc`开始/最高/最低/结束

> 对于数值型的聚合运算，会先弃置缺失值再进行

还可以使用`agg`方法自定义聚合函数：

`grouped = df.groupby("key1")
def peak_to_peak(arr):
     return arr.max() - arr.min()
grouped.agg(peak_to_peak)
grouped.agg(['mean', 'std', peak_to_peak]) # 一次性调用多个聚合函数
grouped.agg([('data1', 'mean'), ('data2', np.std)]) # 针对不同列定义不同的聚合函数
grouped.agg({'data1' : ['min', 'max'],'data2' : 'sum'}) # 使用字典进行更灵活的聚合`

> 自定义聚合函数通常要比内置的聚合函数效率低很多

### 3 apply：更一般化的”拆分-处理-合并“

代码示例：

`frame = pd.DataFrame({"data1": np.random.standard_normal(1000),
                      "data2": np.random.standard_normal(1000)})
quartiles = pd.cut(frame["data1"], 4) # cut函数将数值型转为类别数为4的类别型
def get_stats(group):
     return pd.DataFrame(
         {"min": group.min(), "max": group.max(),
         "count": group.count(), "mean": group.mean()}
     )

grouped = frame.groupby(quartiles)
grouped.apply(get_stats)
# 输出结果: 
#                             min       max  count      mean
# data1                                                     
# (-2.956, -1.23] data1 -2.949343 -1.230179     94 -1.658818
#                 data2 -3.399312  1.670835     94 -0.033333
# (-1.23, 0.489]  data1 -1.228918  0.488675    598 -0.329524
#                 data2 -2.989741  3.260383    598 -0.002622
# (0.489, 2.208]  data1  0.489965  2.200997    298  1.065727
#                 data2 -3.745356  2.954439    298  0.078249
# (2.208, 3.928]  data1  2.212303  3.927528     10  2.644253
#                 data2 -1.929776  1.765640     10  0.024750

grouped.agg(["min", "max", "count", "mean"]) # 另一种等价写法`

> 如果不希望结果的行索引是数据间隔，可以在使用cut方法时添加参数labels=False

案例1：借助apply进行缺失填补

`states = ["Ohio", "New York", "Vermont", "Florida",
           "Oregon", "Nevada", "California", "Idaho"]
group_key = ["East", "East", "East", "East",
              "West", "West", "West", "West"]
data = pd.Series(np.random.standard_normal(8), index=states)
data[["Vermont", "Nevada", "Idaho"]] = np.nan # 人为捏造缺失

def fill_mean(group):
     return group.fillna(group.mean())
data.groupby(group_key).apply(fill_mean) # 均值填补缺失

fill_values = {"East": 0.5, "West": -1}
def fill_func(group):
     return group.fillna(fill_values[group.name])
data.groupby(group_key).apply(fill_func) # 按组 依次用固定值填补缺失`

案例2：分组计算加权平均值

`df = pd.DataFrame({'category': ['a', 'a', 'a', 'a',
                                 'b', 'b', 'b', 'b'],
                    'data': np.random.randn(8),
                    'weights': np.random.rand(8)})
grouped = df.groupby('category')
get_wavg = lambda g: np.average(g['data'], weights=g['weights'])
grouped.apply(get_wavg)`

> 原文中还有蒙特卡洛模拟，分组计算相关性，分组回归等案例，此处不再赘述

### 4 transform：“解包”分组聚合结果

`df = pd.DataFrame({'key': ['a', 'b', 'c'] * 4,
                    'value': np.arange(12.)})

g = df.groupby('key')['value']
def get_mean(group):
     return group.mean()
g.transform(get_mean)
# 此方法会将分组计算的结果再传给原始数据（分组前的数据）
def normalize(x):
     return (x - x.mean()) / x.std()
g.transform(normalize) # 直接对数据进行分组标准化
g.apply(normalize) # 另一种等价写法
 (df['value'] - g.transform('mean')) / g.transform('std') # 等价写法`

> transform方法可以实现非常灵活、高效的向量化操作

### 5 透视表和交叉表

pandas中包含`pivot_table`函数，可以很方便地制作透视表

在计算多因子的分组计数时，使用`crosstab`制作交叉表会更方便

`### 透视表示例
df = pd.DataFrame({"A": ["foo", "foo", "foo", "foo", "foo",
                         "bar", "bar", "bar", "bar"],
                   "B": ["one", "one", "one", "two", "two",
                         "one", "one", "two", "two"],
                   "C": ["small", "large", "large", "small",
                         "small", "large", "small", "small",
                         "large"],
                   "D": [1, 2, 2, 3, 3, 4, 5, 6, 7],
                   "E": [2, 4, 5, 5, 6, 6, 8, 9, 9]})
table = pd.pivot_table(df, values='D', index=['A', 'B'],
                       columns=['C'], aggfunc=np.sum)
table
# C        large  small
# A   B
# bar one    4.0    5.0
#     two    7.0    6.0
# foo one    4.0    1.0
#     two    NaN    6.0

### 交叉表示例
a = np.array(["foo", "foo", "foo", "foo", "bar", "bar",
              "bar", "bar", "foo", "foo", "foo"], dtype=object)
b = np.array(["one", "one", "one", "two", "one", "one",
              "one", "two", "two", "two", "one"], dtype=object)
c = np.array(["dull", "dull", "shiny", "dull", "dull", "shiny",
              "shiny", "dull", "shiny", "shiny", "shiny"],
             dtype=object)
pd.crosstab(a, [b, c], rownames=['a'], colnames=['b', 'c'])
# b   one        two
# c   dull shiny dull shiny
# a
# bar    1     2    1     0
# foo    2     2    1     2`

更多细节可参阅官方API说明：[pandas.pivot_table](https://pandas.pydata.org/docs/reference/api/pandas.pivot_table.html), [pandas.crosstab](https://pandas.pydata.org/docs/reference/api/pandas.crosstab.html)


## 时间序列

常见的三种时间格式：时间戳（timestamp），时期（period），时间间隔（interval）

pandas内置了很多处理时间序列的工具和算法

> pandas也支持将时间间隔（interval）作为索引使用，只是本书未提及

### 1 日期和时间数据类型及用法

除了pandas，本章还会用到`datetime`（用的最多）、`time`以及`calendar`这三个模块

代码示例：

`from datetime import datetime
now = datetime.now() # 获取当前时间，返回datetime格式对象
now.year, now.month, now.day # 查询年月日
delta = datetime(2011, 1, 7) - datetime(2008, 6, 24, 8, 15) # 计算时间间隔
delta.days, delta.seconds # 时间间隔可以转化为天数或秒数

from datetime import timedelta
start = datetime(2011, 1, 7)
start + timedelta(12) # 往后推12天
start - 2 * timedelta(12) # 往前推24天（支持四则运算）

datetime(2011, 1, 3).strftime("%Y-%m-%d") # 日期转字符串
datetime.strptime("7/6/2011", "%m/%d/%Y")  # 字符串转日期
import pandas as pd # pandas内置了时间格式解析方法 to_datetime
pd.to_datetime(["2011-07-06 12:00:00", "2011-08-06 00:00:00"])`

其他细节补充

- `datetime`模块还有一种特殊的时间格式`tzinfo`用于存储时区信息
- 除了用`%Y-%m-%d`表示年-月-日，还常用`%H-%M-%S`表示时-分-秒
- 对于时间缺失值，pandas会用`NaT` (Not a Time)来表示
- 对于时间格式不够规范的字符串，`pd.to_datetime`可能存在错误解析的问题

> 关于datetime与字符串转换时的完整符号表示，可参阅官方文档说明

### 2 时间序列基础

在pandas中，时间戳常作为索引使用在时间序列数据中，这类索引也叫做`DatetimeIndex`

代码示例：

`dates = [datetime(2011, 1, 2), datetime(2011, 1, 5),
          datetime(2011, 1, 7), datetime(2011, 1, 8),
          datetime(2011, 1, 10), datetime(2011, 1, 12)]
ts = pd.Series(np.random.randn(6), index=dates)
ts.index.dtype # 时间格式的index
ts.index[-2],  # DatetimeIndex支持切片
ts['1/10/2011'], ts['20110110'] # DatetimeIndex也支持灵活的筛选

longer_ts = pd.Series(np.random.randn(1000),
    				  index=pd.date_range('1/1/2000', periods=1000))
longer_ts['2001'] # 筛选2001年份的数据
ts[datetime(2011, 1, 7):datetime(2011, 1, 10)] # 筛选一段时间内的数据

dates = pd.DatetimeIndex(['1/1/2000', '1/2/2000', '1/2/2000',
                           '1/2/2000', '1/3/2000'])
dup_ts = pd.Series(np.arange(5), index=dates) # 带有重复索引的时间序列
dup_ts.index.is_unique # 检验索引的唯一性
dup_ts.groupby(level=0).mean() # 去除重复索引（取均值）`

### 3 日期的范围，频率和平移

代码示例：

`# 对于间隔不固定的时序可以指定频率（每天）进行重采样
resampler = ts.resample('D') # 采样不到的日期内会产生缺失值

pd.date_range('2012-04-01', '2012-06-01') # 生成日期范围，默认按天
pd.date_range(start='2012-04-01', periods=20) # 生成20天的日期范围，只指定起始日期
pd.date_range(end='2012-06-01', periods=20) # 生成20天的日期范围，只指定结束日期
pd.date_range('2000-01-01', '2000-05-01', freq='BM') # 指定频率（每个月末）
# 结果是DatetimeIndex(['2000-01-31', '2000-02-29', '2000-03-31', 
# '2000-04-28', dtype='datetime64[ns]', freq='BM'])

pd.date_range('2012-05-02 12:56:31', periods=5, normalize=True) # 省略时分秒
pd.date_range('2000-01-01', '2000-01-03 23:59', freq='4h') # 频率为4小时
pd.date_range('2000-01-01', periods=10, freq='1h30min') # 不同频率可以组合
pd.date_range('2012-01-01', '2012-09-01', freq='WOM-3FRI') # 每月第3个星期五

ts = pd.Series(np.random.randn(4),
                index=pd.date_range('1/1/2000', periods=4, freq='M'))
ts.shift(2) # 数据向后平移2天，最前两条数据将缺失
ts.shift(-2) # 数据向前平移2天，最后两条数据将缺失
ts / ts.shift(1) - 1 # 计算每日变化率
ts.shift(2, freq='M') # 数据向后平移2个月

from pandas.tseries.offsets import Day, MonthEnd
now = datetime(2011, 11, 17)
now + 3 * Day() # 直接通过偏移量的加减进行平移
now + MonthEnd(2) # 平移到第二个月的月底：2011-12-31
MonthEnd().rollforward(now) # 往后平移一次：2011-11-30
MonthEnd().rollback(now) # 往前平移一次：2011-10-31`

> 常见的频率包括D每天、H每小时、T每分、S每秒、L每毫秒，更多频率可参阅官方文档

### 4 时区处理

一般认为UTC是国际标准时区，其他时区则以UTC偏移量的形式表示的

Python使用第三方库pytz来实现不同时区的信息处理（源数据来自Olson数据库）

代码示例：

`import pytz

pytz.common_timezones[-5:] # 最常见的五个时区
pd.date_range('3/9/2012 9:30', periods=10, freq='D', tz='UTC') # 指定时区

rng = pd.date_range('3/9/2012 9:30', periods=6, freq='D')
ts = pd.Series(np.random.randn(len(rng)), index=rng)
ts.tz_localize('UTC') # 指定时区
ts_eastern.tz_convert('Europe/Berlin') # 转换时区

pd.Timestamp('2011-03-12 04:00').tz_localize('utc').tz_convert('America/New_York')
pd.Timestamp('2011-03-12 04:00', tz='utc').tz_convert('America/New_York')`

> 不同时区的数据运算时，会自动转换为标准UTC时区再进行

### 5 时期及其算术运算

时期（period）表示的是时间区间，比如数日、数月、数年等，对应`pandas.Period`对象

代码示例：

`pd.Period(2007, freq='A-DEC') # 生成一个时期对象，A-DEC表示每年年底（12月份）
pd.period_range("2000-01-01", "2000-06-30", freq="M") # 生成一个时期序列，按月
pd.PeriodIndex(["2001Q3", "2002Q2", "2003Q1"], freq="Q-DEC") # 转换为时期对象，按季

# 不同时期转换 | 按年计算时期也会指定月份（比如A-JUN表示每年6月份）
pd.Period('2007', freq='A-JUN').asfreq('M', 'start') # Period('2006-07', 'M')
pd.Period('2007', freq='A-JUN').asfreq('M', 'end') # Period('2007-06', 'M')
pd.Period("Aug-2011", "M").asfreq("A-JUN") # Period('2012', 'A-JUN')
pd.Period('2007', freq='A-DEC').asfreq("B", how="end") # 每年最后一个工作日`

不同时期之间的转换需要考虑低频时期的范围与高频时期的位置：

![[Notion/42向量/领域圣经/成长-关系-职场/assets/《10x Is Easier Than 2x》10倍比2倍容易/image 221.png]]

不同领域的季度划分也会存在差异，Python提供了灵活的切分方式：

![[Notion/42向量/领域圣经/成长-关系-职场/assets/《10x Is Easier Than 2x》10倍比2倍容易/image 222.png]]

其他时期处理的常用技巧：

- 使用`to_period`和`to_timestamp`可以将日期与时期进行互相转换
- `PeriodIndex`支持多个列（比如年、季度）组合为一列`Period`时期对象
- 更多`pandas.Period`时期对象的选择可参阅[官方文档](https://pandas.pydata.org/pandas-docs/stable/user_guide/timeseries.html#anchored-offsets)

### 6 重采样及频率转换

重采样（resampling）指的是将时间序列从一个频率转换到另一个频率的处理过程

将高频率数据聚合到低频率称为降采样（downsampling）

将低频率数据转换到高频率则称为升采样（upsampling）

代码示例：

`dates = pd.date_range("2000-01-01", periods=100)
ts = pd.Series(np.random.standard_normal(len(dates)), index=dates)
ts.resample("M").mean() # 按月重采样
ts.resample("M", kind="period").mean() # 按月重采样-时期对象

rng = pd.date_range('2000-01-01', periods=12, freq='T')
ts = pd.Series(np.arange(12), index=rng)
ts.resample('5min', closed='right').sum() # 聚合时包含右边界
ts.resample('5min', closed='right', label='right').sum() # 以右边界作为区间标识
ts.resample('5min').ohlc() # 计算初始值/最高值/最低值/结束值（金融领域常用）`

`resample`过程中闭合边界参数`closed`与标识参数`label`的图示：

![[Notion/42向量/领域圣经/成长-关系-职场/assets/《10x Is Easier Than 2x》10倍比2倍容易/image 223.png]]

其他细节说明：

- `resample`方法内置了类似于groupby的分组聚合机制
- `resample`方法可以通过参数`axis`指定需要重采样的轴；也可以通过参数`fill_method`在升采样时候进行插值；当对周期进行升采样时，还需要借助参数`convention`指定`start/end`；参数`offset`用于指定采样结果的时间偏移量
- 当每组只有一个值时，升采样可考虑使用`asfreq`方法，其他聚类函数（比如`sum/mean`）等会导致引入缺失值
- 在降采样中，目标频率必须是源频率的子时期（subperiod）
- 在升采样中，目标频率必须是源频率的超时期（superperiod）

### 7 移动窗口函数

移动窗口函数（moving window function）代表着时间序列中常用的一种统计运算，比如计算过去一段时间内的均值或方差，也可以是稍微复杂点运算，比如指数加权移动平均等。移动窗口函数运算时会自动舍弃缺失值。

代码示例：

`close_px_all = pd.read_csv('examples/stock_px_2.csv', # 读取数据
                            parse_dates=True, index_col=0)
plt.style.use('grayscale')

aapl_px = close_px["AAPL"]["2006":"2007"] # 苹果公司2006~2007年收盘价
ma30 = aapl_px.rolling(30, min_periods=20).mean() # 30日移动平均
ewma30 = aapl_px.ewm(span=30).mean() # 指数加权移动平均
aapl_px.plot(style="k-", label="Price")
ma30.plot(style="k--", label="Simple Moving Avg")
ewma30.plot(style="k-", label="EW MA")`

绘图结果（苹果公司股价，30日移动平均，指数加权移动平均）：

代码示例：

`close_px = close_px_all[["AAPL", "MSFT", "XOM"]]
close_px = close_px.resample("B").ffill() # 缺失填补
spx_rets = close_px_all["SPX"].pct_change() # 计算标普500的每日价格波动
# 移动窗口计算三家公司与标普500的相关系数
corr = close_px.pct_change().rolling(125, min_periods=100).corr(spx_rets)
corr.plot()`

绘图结果（三家公司与标普500的相关系数趋势）：

![[Notion/42向量/领域圣经/成长-关系-职场/assets/《10x Is Easier Than 2x》10倍比2倍容易/image 224.png]]

其他细节补充：

- 用`expanding`方法替代`rolling`方法可以取消窗口大小限制（窗口大小随数据量增加而增加）
- 用户可以自定义移动窗口函数，只需要确保输入是数组/序列，输出是单个值

## 建模相关Python库介绍

本章主要简单介绍了[statsmodels](http://statsmodels.org/) 和 [scikit-learn](http://scikit-learn.org/)这两个Python建模的常用模块

### 1 衔接pandas与建模代码

先使用pandas进行数据加载和清理后，再进行建模是模型开发的一个常见工作流

一般建模工具都支持数组结构，所以经常用`to_numpy`方法将DataFrame转换为NumPy数组

代码示例：

`data = pd.DataFrame({
     'x0': [1, 2, 3, 4, 5],
     'x1': [0.01, -0.01, 0.25, -4.1, 0.],
     'y': [-1.5, 0., 3.6, 1.3, -2.]})
data.to_numpy()
data.loc[:, ['x0', 'x1']].to_numpy() # 子集转数组
data['category'] = pd.Categorical(['a', 'b', 'a', 'a', 'b'],
                                   categories=['a', 'b'])
dummies = pd.get_dummies(data.category, prefix='category') # 哑变量处理
data_with_dummies = data.drop('category', axis=1).join(dummies)`

### 2 使用Patsy创建模型描述

对于统计模型，常使用[Patsy](https://patsy.readthedocs.io/)模块进行公式化描述（灵感来自R语言）：Pasty在安装statsmodels时会自动安装：`conda install statsmodels`

代码示例：

`import patsy
y, X = patsy.dmatrices('y ~ x0 + x1', data) # 构建模型
# Patsy对象可以直接传递到numpy.linalg这样的算法中
coef, resid, _, _ = np.linalg.lstsq(X, y) # 回归系数，残差
# 可以将Python代码混合到Patsy公式中
y, X = patsy.dmatrices('y ~ x0 + np.log(np.abs(x1) + 1)', data)
# Patsy公式也内置了一些常用的函数：比如标准化或中心化
y, X = patsy.dmatrices('y ~ standardize(x0) + center(x1)', data)
# 直接将处理后的X输出
new_X = patsy.build_design_matrices([X.design_info], data)
# 因为加号有特殊函数，所以加法的写法比较特殊
y, X = patsy.dmatrices('y ~ I(x0 + x1)', data)
# 显式声明某一特征为非数值型特征
y, X = patsy.dmatrices('y ~ C(x0)', data)
# 构造特征交互性，增强模型的非线性拟合能力
y, X = patsy.dmatrices('y ~ x0 + x1 + x0:x1', data)`

> 对于非数值型特征，Patsy默认会转换为虚拟变量（0-1变量）

### 3 statsmodels介绍

[statsmodels](http://www.statsmodels.org/)常用于经典的统计建模、假设检验以及数据探索和可视化

代码示例：

`import statsmodels.api as sm
import statsmodels.formula.api as smf
# 随机生成测试数据
rng = np.random.default_rng(seed=12345)

def dnorm(mean, variance, size=1):
    if isinstance(size, int):
        size = size,
    return mean + np.sqrt(variance) * rng.standard_normal(*size)

N = 100
X = np.c_[dnorm(0, 0.4, size=N),
          dnorm(0, 0.6, size=N),
          dnorm(0, 0.2, size=N)]
eps = dnorm(0, 0.1, size=N)
beta = [0.1, 0.3, 0.5]
y = np.dot(X, beta) + eps
# 拟合普通线性回归 - 最小二乘法
results = sm.OLS(y, X).fit()
print(results.summary())
# 拟合普通线性回归 - Patsy格式
data = pd.DataFrame(X, columns=['col0', 'col1', 'col2'])
data['y'] = y
results = smf.ols('y ~ col0 + col1 + col2', data=data).fit()
results.predict(data[:5]) # 执行预测`

> 除了普通线性回归，statsmodels模块还主要支持广义线性模型、鲁棒线性模型、线性混合效应模型、方差分析(ANOVA)、时序分析（ARMA）、状态空间模型、广义矩方法等

### 4 scikit-learn介绍

[scikit-learn](http://scikit-learn.org/) 是广泛使用的通用Python机器学习工具包之一，包含了大量的标准有监督和无监督机器学习方法，以及用于模型选择和评估、数据转换、数据加载和模型持久化的工具

本小节将使用来自Kaggle的[经典的泰坦尼克号数据集](https://www.kaggle.com/c/titanic)来进行演示：

`train = pd.read_csv('datasets/titanic/train.csv')
test = pd.read_csv('datasets/titanic/test.csv')
# 缺失检查
train.isnull().sum()
test.isnull().sum()
# 缺失处理
impute_value = train['Age'].median() 
train['Age'] = train['Age'].fillna(impute_value)
test['Age'] = test['Age'].fillna(impute_value)
# 类型转换
train['IsFemale'] = (train['Sex'] == 'female').astype(int)
test['IsFemale'] = (test['Sex'] == 'female').astype(int) 
# 数据准备
predictors = ['Pclass', 'IsFemale', 'Age']
 X_train = train[predictors].values
X_test = test[predictors].values
y_train = train['Survived'].values
# 逻辑回归建模
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(X_train, y_train) # 拟合
y_predict = model.predict(X_test) # 预测
(y_true == y_predict).mean() # 计算准确率
# 自动调参 - 正则化参数C
from sklearn.linear_model import LogisticRegressionCV
model_cv = LogisticRegressionCV(Cs=10)
model_cv.fit(X_train, y_train)
# 交叉验证
from sklearn.model_selection import cross_val_score
model = LogisticRegression(C=10)
scores = cross_val_score(model, X_train, y_train, cv=4)
scores # 查看模型评价`