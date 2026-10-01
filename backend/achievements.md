## Compile achievements

# SwimRank — Seed de Conquistas

## Pré-requisitos

```powershell
$baseUrl = "https://swimrank-api.onrender.com"

$adminHeaders = @{
  Authorization = "Bearer $adminToken"
}
```

---

# 1. Primeira Braçada

```powershell
$body = @{
  name        = "Primeira Braçada"
  description = "Registre sua primeira atividade de natação aprovada."
  category    = "FIRST_STEPS"
  requirement = @{
    type  = "FIRST_ACTIVITY"
    value = 1
  }
  points      = 100
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 2. 100m

```powershell
$body = @{
  name        = "100m"
  description = "Acumule 100 metros nadados."
  category    = "DISTANCE"
  requirement = @{
    type  = "TOTAL_DISTANCE"
    value = 100
  }
  points      = 100
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 3. 400m

```powershell
$body = @{
  name        = "400m"
  description = "Acumule 400 metros nadados."
  category    = "DISTANCE"
  requirement = @{
    type  = "TOTAL_DISTANCE"
    value = 400
  }
  points      = 100
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 4. 750m

```powershell
$body = @{
  name        = "750m"
  description = "Acumule 750 metros nadados."
  category    = "DISTANCE"
  requirement = @{
    type  = "TOTAL_DISTANCE"
    value = 750
  }
  points      = 100
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 5. 1 Km

```powershell
$body = @{
  name        = "1 Km"
  description = "Acumule 1 quilômetro nadado."
  category    = "DISTANCE"
  requirement = @{
    type  = "TOTAL_DISTANCE"
    value = 1000
  }
  points      = 150
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 6. 2 Km

```powershell
$body = @{
  name        = "2 Km"
  description = "Acumule 2 quilômetros nadados."
  category    = "DISTANCE"
  requirement = @{
    type  = "TOTAL_DISTANCE"
    value = 2000
  }
  points      = 100
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 7. Canal da Mancha

```powershell
$body = @{
  name        = "Canal da Mancha"
  description = "Acumule uma distância equivalente à travessia do Canal da Mancha."
  category    = "DISTANCE"
  requirement = @{
    type  = "TOTAL_DISTANCE"
    value = 33000
  }
  points      = 500
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 8. Meio Iron

```powershell
$body = @{
  name        = "Meio Iron"
  description = "Acumule uma distância equivalente ao percurso de natação de um Meio Ironman."
  category    = "DISTANCE"
  requirement = @{
    type  = "TOTAL_DISTANCE"
    value = 1900
  }
  points      = 500
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 9. Iron Full

```powershell
$body = @{
  name        = "Iron Full"
  description = "Acumule uma distância equivalente ao percurso de natação de um Ironman completo."
  category    = "DISTANCE"
  requirement = @{
    type  = "TOTAL_DISTANCE"
    value = 3800
  }
  points      = 500
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 10. Leme ao Pontal

```powershell
$body = @{
  name        = "Leme ao Pontal"
  description = "Acumule uma distância equivalente à travessia do Leme ao Pontal."
  category    = "DISTANCE"
  requirement = @{
    type  = "TOTAL_DISTANCE"
    value = 35000
  }
  points      = 500
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 11. Meia Maratona

```powershell
$body = @{
  name        = "Meia Maratona"
  description = "Acumule 21,1 quilômetros nadados."
  category    = "DISTANCE"
  requirement = @{
    type  = "TOTAL_DISTANCE"
    value = 21100
  }
  points      = 500
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 12. Maratona

```powershell
$body = @{
  name        = "Maratona"
  description = "Acumule 42,2 quilômetros nadados."
  category    = "DISTANCE"
  requirement = @{
    type  = "TOTAL_DISTANCE"
    value = 42200
  }
  points      = 500
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 13. 1 Mês

```powershell
$body = @{
  name        = "1 Mês"
  description = "Participe de atividades de natação durante 1 mês."
  category    = "CONSISTENCY"
  requirement = @{
    type  = "PARTICIPATION_MONTHS"
    value = 1
  }
  points      = 250
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 14. 6 Meses

```powershell
$body = @{
  name        = "6 Meses"
  description = "Participe de atividades de natação durante 6 meses."
  category    = "CONSISTENCY"
  requirement = @{
    type  = "PARTICIPATION_MONTHS"
    value = 6
  }
  points      = 250
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 15. 1 Ano

```powershell
$body = @{
  name        = "1 Ano"
  description = "Mantenha sua participação na natação durante 12 meses."
  category    = "CONSISTENCY"
  requirement = @{
    type  = "PARTICIPATION_MONTHS"
    value = 12
  }
  points      = 250
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 16. Top 5

```powershell
$body = @{
  name        = "Top 5"
  description = "Fique entre os 5 primeiros colocados no ranking."
  category    = "RANKING"
  requirement = @{
    type  = "RANKING_POSITION"
    value = 5
  }
  points      = 100
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 17. Top 3

```powershell
$body = @{
  name        = "Top 3"
  description = "Fique entre os 3 primeiros colocados no ranking."
  category    = "RANKING"
  requirement = @{
    type  = "RANKING_POSITION"
    value = 3
  }
  points      = 100
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

---

# 18. Top 1

```powershell
$body = @{
  name        = "Top 1"
  description = "Alcance o primeiro lugar no ranking."
  category    = "RANKING"
  requirement = @{
    type  = "RANKING_POSITION"
    value = 1
  }
  points      = 100
} | ConvertTo-Json -Depth 5

$achievement = Invoke-RestMethod `
  -Uri "$baseUrl/achievements" `
  -Method POST `
  -Headers $adminHeaders `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$achievement | ConvertTo-Json -Depth 10
```

## Shortcut

function New-Achievement {
  param (
    [string]$Name,
    [string]$Description,
    [string]$Category,
    [string]$RequirementType,
    [int]$RequirementValue,
    [int]$Points
  )

  $body = @{
    name = $Name
    description = $Description
    category = $Category
    requirement = @{
      type = $RequirementType
      value = $RequirementValue
    }
    points = $Points
  } | ConvertTo-Json -Depth 5

  $achievement = Invoke-RestMethod `
    -Uri "$baseUrl/achievements" `
    -Method POST `
    -Headers $adminHeaders `
    -ContentType "application/json; charset=utf-8" `
    -Body $body

  Write-Host "Criada: $Name"

  return $achievement
}


New-Achievement `
  -Name "Primeira Braçada" `
  -Description "Registre sua primeira atividade de natação aprovada." `
  -Category "FIRST_STEPS" `
  -RequirementType "FIRST_ACTIVITY" `
  -RequirementValue 1 `
  -Points 100

New-Achievement `
  -Name "1 Km" `
  -Description "Acumule 1 quilômetro nadado." `
  -Category "DISTANCE" `
  -RequirementType "TOTAL_DISTANCE" `
  -RequirementValue 1000 `
  -Points 150

---

# Resumo

|  # | Conquista        | Type                   | Value | Points |
| -: | ---------------- | ---------------------- | ----: | -----: |
|  1 | Primeira Braçada | `FIRST_ACTIVITY`       |     1 |    100 |
|  2 | 100m             | `TOTAL_DISTANCE`       |   100 |    100 |
|  3 | 400m             | `TOTAL_DISTANCE`       |   400 |    100 |
|  4 | 750m             | `TOTAL_DISTANCE`       |   750 |    100 |
|  5 | 1 Km             | `TOTAL_DISTANCE`       |  1000 |    150 |
|  6 | 2 Km             | `TOTAL_DISTANCE`       |  2000 |    100 |
|  7 | Canal da Mancha  | `TOTAL_DISTANCE`       | 33000 |    500 |
|  8 | Meio Iron        | `TOTAL_DISTANCE`       |  1900 |    500 |
|  9 | Iron Full        | `TOTAL_DISTANCE`       |  3800 |    500 |
| 10 | Leme ao Pontal   | `TOTAL_DISTANCE`       | 35000 |    500 |
| 11 | Meia Maratona    | `TOTAL_DISTANCE`       | 21100 |    500 |
| 12 | Maratona         | `TOTAL_DISTANCE`       | 42200 |    500 |
| 13 | 1 Mês            | `PARTICIPATION_MONTHS` |     1 |    250 |
| 14 | 6 Meses          | `PARTICIPATION_MONTHS` |     6 |    250 |
| 15 | 1 Ano            | `PARTICIPATION_MONTHS` |    12 |    250 |
| 16 | Top 5            | `RANKING_POSITION`     |     5 |    100 |
| 17 | Top 3            | `RANKING_POSITION`     |     3 |    100 |
| 18 | Top 1            | `RANKING_POSITION`     |     1 |    100 |
