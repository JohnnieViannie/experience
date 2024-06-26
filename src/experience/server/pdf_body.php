<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cyanase investors- report</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="./pdf.css">
</head>
<body>
<link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />

<section class="home section">
  <div class="home__rectangle"></div>

  <div class="home__container container grid">
    <div class="home__perfil perfil">
      <div class="perfil__content">
        <img src="https://server.cyanase.lol/media/profile/<?php echo $profilePicture;?>" alt="image" class="perfil__img">
      </div>
    </div>

    <div class="home__content grid">
      <div class="home__data grid">
        <h1 class="home__name"><?php echo ''.$firstName.' '.$lastName.'';?></h1>
        <h2 class="home__profession"><?php ''.$username.'';?></h2>
        <div class="home__social">
          <a href="https://cyanase.com/" target="_blank" class="home__social-link">
            <img width="70" src="https://developers.cyanase.lol/image/logh.png"/>
          </a>
          <a href="https://cyanase.com/" target="_blank" class="home__social-link">
            <img width="70" src="https://fund.cyanase.lol/fund/profile_pic/<?php echo $fundPic;?>"/>
          </a>
        </div>
      </div>
      <a href="#" download="" class="home__button button">Download report</a>
    </div>
  </div>
</section>

<section>
    <h1>Latest Transactions</h1>

    <?php
    foreach ($transactions as $transaction) {
        if (isset($transaction['deposit'])) {
          $class= 'plus';
            $amount = $transaction['deposit'];
            $time = $transaction['deposit_time'];
            $type = 'Deposit';
            $currency = $transaction['currency'];
            // Icon for deposit
            $icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3zM3 9l9 6 9-6"/></svg>';
        } elseif (isset($transaction['withdraw'])) {
          $class='';
            $amount = $transaction['withdraw'];
            $time = $transaction['withdraw_time'];
            $currency = $transaction['currency'];
            $type = 'Withdraw';
            // Icon for withdraw
            $icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3zM9 9l6 6-6 6"/></svg>';
        }
        $optionName = $transaction['optionName'];

        echo "<details>";
        echo "<summary>";
        echo "<div>";
        echo "<span>$icon</span>"; // Add the icon here
        echo "<h3>";
        echo "<strong>" . $type. "</strong>";
       	echo	"<small>".$optionName."</small>";
        echo "</h3>";
        echo "<span class='".$class."'>".$currency." ". $amount. "</span>";
        echo "</div>";
        echo "</summary>";
        echo "<div>";
        echo "<dl>";
        echo "<div>";
        echo "<dt>Transaction date</dt>";
        echo "<dd>$time</dd>";
        echo "</div>";
        echo "</div>";
        echo "</dl>";
        echo "</div>";
        echo "</details>";
    }
    ?>
</section>

<?php

$via = json_decode($monthlyData, true);

if ($via !== null) {
    foreach ($via as $currencyData) {

        usort($currencyData['years'], function ($a, $b) {
            return $a['year'] <=> $b['year'];
        });

        echo '<section class="currency-section">'; // Adding class name
        echo "<h2>".$currencyData['currency']."</h2>";

        foreach ($currencyData['years'] as $yearData) {
            $year = $yearData['year'];
            $data = $yearData['data'];

            // Filter out months where all values are zero
            $filteredData = array_filter($data, function($monthData) {
                return $monthData['Interest'] != 0 || $monthData['ManagementFee'] != 0 || $monthData['TotalDeposit'] != 0 || $monthData['TotalWithdrawal'] != null;
            });

            if (empty($filteredData)) continue;

            echo "<h3>$year</h3>";

            // Table for summary
            echo '<div class="table-wrap">';
            echo '<table class="summary-table">'; // Adding class name
            echo '<caption>Summary for ' . $year . '</caption>';
            echo '<thead>';
            echo '<tr>';
            echo '<th>Total Deposit</th>';
            echo '<th>Total Interest</th>';
            echo '<th>Total Withdrawal</th>';
            echo '<th>Total Management Fees</th>';
            echo '<th>Closing Balance</th>';
            echo '</tr>';
            echo '</thead>';
            echo '<tbody>';

            $totalDeposit = 0;
            $totalInterest = 0;
            $totalWithdrawal = 0;
            $totalManagementFee = 0;
            $closingBalance = 0;

            foreach ($filteredData as $monthData) {
                $totalDeposit += $monthData['TotalDeposit'];
                $totalInterest += $monthData['Interest'];
                $totalWithdrawal += $monthData['TotalWithdrawal'];
                $totalManagementFee += $monthData['ManagementFee'];
            }

            $closingBalance = $totalDeposit + $totalInterest - $totalWithdrawal - $totalManagementFee;

            echo '<tr>';
            echo '<td>' . number_format($totalDeposit) . '</td>';
            echo '<td>' . number_format($totalInterest) . '</td>';
            echo '<td>' . number_format($totalWithdrawal) . '</td>';
            echo '<td>' . number_format($totalManagementFee) . '</td>';
            echo '<td>' . number_format($closingBalance) . '</td>';
            echo '</tr>';

            echo '</tbody>';
            echo '</table>';
            echo '</div>';

            // Table for transaction details
            echo '<div class="table-wrap">';
            echo '<table class="transaction-table">'; // Adding class name
            echo '<caption>Transaction Summary for ' . $year . '</caption>';
            echo '<thead>';
            echo '<tr>';
            echo '<th>Date</th>';
            echo '<th>Description</th>';
            echo '<th>Amount</th>';
            echo '<th>Closing Balance</th>';
            echo '</tr>';
            echo '</thead>';
            echo '<tbody>';

            // Array of abbreviated month names
            $monthNames = array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

            $openingBalance = 0;
            foreach ($filteredData as $monthData) {
                $monthIndex = $monthData['month'] - 1;
                $date = sprintf('%02d/%02d/%04d', $monthData['month'], 1, $year); // e.g., 01/01/2021

                // Description
                $description = 'Transaction for ' . $monthNames[$monthIndex];

                // Calculate the closing balance for each transaction
                $closingBalance = $openingBalance + $monthData['TotalDeposit'] + $monthData['Interest'] - $monthData['TotalWithdrawal'] - $monthData['ManagementFee'];

                // Transaction row
                echo '<tr>';
                echo '<td>' . $date . '</td>';
                echo '<td>' . $description . '</td>';
                echo '<td>' . number_format($monthData['TotalDeposit'] + $monthData['Interest'] - $monthData['TotalWithdrawal'] - $monthData['ManagementFee']) . '</td>';
                echo '<td>' . number_format($closingBalance) . '</td>';
                echo '</tr>';

                // Update opening balance for next transaction
                $openingBalance = $closingBalance;
            }

            echo '</tbody>';
            echo '</table>';
            echo '</div>';
        }

        echo '</section>';
    }
} else {
    echo "Error decoding JSON data";
}
?>


<?php
$dataz = json_decode($dataz, true);
 
// Check if decoding was successful
if($dataz !== null) {
    // Now you can proceed with the foreach loop
    foreach ($dataz as $currency => $currencyData) {
        // Sort the currency data by year
        usort($currencyData, function($a, $b) {
            return $a['Year'] <=> $b['Year'];
        });

        echo '<section>';

        // Years section
        echo '<div id="years" aria-hidden="true">';
        foreach ($currencyData as $data) {
            echo "<span>{$data['Year']}</span>";
        }
        echo '</div>';

        // Table wrapper
        echo '<div class="table-wrap">';
        echo "<h2>$currency</h2>"; // Display currency name as table title

        // Start the table for assets
        echo '<table>';
        echo '<caption>Assets</caption>';

        echo '<tbody>';

        // Rows for different types of data
        echo '<tr class="data">';
        echo '<th>Opening Balance<span class="description">This is how much you had at the beginning</span></th>';
        $openingBalance = 0;
        foreach ($currencyData as $data) {
            echo '<td>' . number_format($openingBalance) . '</td>';
          
            $openingBalance = $openingBalance+$data['Interest'] + $data['TotalDeposit']-$data['ManagementFee'];
        }
        echo '</tr>';

        echo '<tr class="data">';
        echo '<th>Deposit<span class="description">This is how much you deposited.</span></th>';
        foreach ($currencyData as $data) {
            echo '<td>' . number_format($data['TotalDeposit']) . '</td>';
        }
        echo '</tr>';

        echo '<tr class="data">';
        echo '<th>Interest<span class="description">This is how much interest you have earned.</span></th>';
        foreach ($currencyData as $data) {
            echo '<td>' . number_format($data['Interest']) . '</td>';
        }
        echo '</tr>';

        echo '<tr class="data">';
        echo '<th>Withdraw<span class="description">This is how much you withdrew.</span></th>';
        foreach ($currencyData as $data) {
            echo '<td>' . number_format($data['TotalWithdrawal']) . '</td>';
        }
        echo '</tr>';

        echo '<tr class="data">';
        echo '<th>Management Fees<span class="description">This is how much you are charged by us.</span></th>';
        foreach ($currencyData as $data) {
            echo '<td>' . number_format($data['ManagementFee']) . '</td>';
        }
        echo '</tr>';

        // Calculate total for each year
        echo '<tr class="total">';
        echo '<th>Total</th>';
$openingBal=0;
        foreach ($currencyData as $data) {
            $total = $openingBal+$data['TotalDeposit'] + $data['Interest'] - $data['TotalWithdrawal'] - $data['ManagementFee'];
            echo '<td>' . number_format($total) . '</td>';
             $openingBal = $openingBal+ $data['Interest'] + $data['TotalDeposit']-$data['ManagementFee'];
        }
        
        echo '</tr>';

        // End the table for assets
        echo '</tbody>';
        echo '</table>';

        // End table wrapper
        echo '</div>';

        // End section
        echo '</section>';
    }
} else {
    // Handle the case when decoding fails
    echo "Error decoding JSON data";
}
?>

</body>
</html>
