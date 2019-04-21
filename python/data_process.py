import os
import pandas as pd
import json
import numpy

dir = '..\\data\\expand\\DYNMOGA\\fitness_value\\iteration\\'
expand_ECD_fitness = []
for i in range(1,11):
    dyn_Q = []
    dyn_NMI = []
    filename = dir+'t_'+str(i)+'\\dyn_Q.csv'
    df = pd.read_csv(filename)
    for k in range(len(df)):
        dyn_Q.append(float(df['Modularity'][k]))
    if i>1:
        filename = dir+'t_'+str(i)+'\\dyn_NMI.csv'
        df = pd.read_csv(filename)
        for k in range(len(df)):
            dyn_NMI.append(float(df['NMI'][k]))
    else:
        pass
    timestep = {
        "dyn_Q": dyn_Q,
        "dyn_NMI": dyn_NMI
    }
    expand_ECD_fitness.append(timestep)

f = open('../data/node/expand_dynmoga_fitness.json','w')
f.write(json.dumps(expand_ECD_fitness))
f.close()
print('write successful: ../data/node/expand_dynmoga_fitness.json')


dir = '..\\data\\merge\\DYNMOGA\\fitness_value\\iteration\\'
expand_ECD_fitness = []
for i in range(1,11):
    dyn_Q = []
    dyn_NMI = []
    filename = dir+'t_'+str(i)+'\\dyn_Q.csv'
    df = pd.read_csv(filename)
    for k in range(len(df)):
        dyn_Q.append(float(df['Modularity'][k]))
    if i>1:
        filename = dir+'t_'+str(i)+'\\dyn_NMI.csv'
        df = pd.read_csv(filename)
        for k in range(len(df)):
            dyn_NMI.append(float(df['NMI'][k]))
    else:
        pass
    timestep = {
        "dyn_Q": dyn_Q,
        "dyn_NMI": dyn_NMI
    }
    expand_ECD_fitness.append(timestep)

f = open('../data/node/merge_dynmoga_fitness.json','w')
f.write(json.dumps(expand_ECD_fitness))
f.close()
print('write successful: ../data/node/merge_dynmoga_fitness.json')





# expand_ECD_node = []
# expand_ECD_node.append([[]])
# for i in range(2,11):
#     timestep = []
#     for j in range(1,101):
#         filename = dir+'t_'+str(i)+'\\iter_'+str(j)+'.csv'
#         df = pd.read_csv(filename)
#         ite = []
#         for k in range(len(df)):
#             ite.append([j,float(df['NMI'][k])])
#         timestep.append(ite)
#     expand_ECD_node.append(timestep)

# f = open('../data/node/merge_ecd_NMI.json','w')
# f.write(json.dumps(expand_ECD_node))
# f.close()