import java.util.Arrays;
import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        int[] arr = new int[]{8, 2, 1, 0, 3};
        int[] index = new int[]{2, 0, 3, 2, 4, 0, 1, 3, 2, 3, 3};
        StringBuilder tel = new StringBuilder();
        for (int j : index) {
            tel.append(arr[j]);
        }
        System.out.println("联系方式：" + tel);
    }
}

class test2 {
    public static void main(String[] args) {
        /*
          @Author studier
          @create 2023 9 25 19.09
          @version 17
         */
        // 规定weeks数组
        String[] weeks = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};
        // 开启输入
        Scanner scanner = new Scanner(System.in);
        System.out.println("1-7");
        // 记录输入的数字
        int next = scanner.nextInt();
        // 判断输入是否规范
        if (next < 1 || next > 7) {
            System.out.println("error");
        } else {
            System.out.println("today is :" + weeks[next]);
        }
        // 关闭输入
        scanner.close();
    }
}

class test3 {
    public static void main(String[] args) {
        System.out.println("输入一个数字:");
        // 开启输入
        Scanner scanner = new Scanner(System.in);
        // 记录输入值
        int count = scanner.nextInt();
        // 初始化动态数组
        int[] arrays = new int[count];
        // 初始化最大值
        int maxCount = 0;
        System.out.println("为每个数赋值");
        // 循环数组
        for (int i : arrays) {
            // 为每个数组元素开启赋值输入
            arrays[i] = scanner.nextInt();
            // 比较得出最大值 并赋值给maxCount
            if (maxCount < arrays[i]) {
                maxCount = arrays[i];
            }
        }
        // 输入关闭
        scanner.close();
        System.out.println("最大数为:" + maxCount);
    }
}

class test4 {
    public static void main(String[] args) {
        // 创建一个二维数组
        int[][] arrays = new int[][]{{1, 2, 3}, {3, 4, 5}};
        int i = arrays[1][2];
        System.out.println(i);
        // 二维数组的遍历
        for (int[] array : arrays) {
            for (int j : array) {
                System.out.print(j);
            }
        }
        System.out.println();
        System.out.println("-------------------------");
        // 创建一个空的二维数组
        int[][] ints = new int[5][5];
        // 确定元素的值
        for (int a = 0; a < ints.length; a++) {
            for (int b = 0; b < ints.length; b++) {
                ints[a][b] = b + 1;
            }
        }
        System.out.println(Arrays.deepToString(ints));
    }
}

// 九九乘法表
class test5 {
    public static void main(String[] args) {
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + "*" + i + "=" + (i * j) + '\t');
            }
            System.out.println();
        }
    }
}

class test6 {
    public static void main(String[] args) {
        int sum = 0;
        double avg = 0;
        for (int i : new int[]{1, 2, 3, 4, 5, 6}) {
            sum += i;
            int[] count = new int[i];
            avg = (double) sum / count.length;
        }
        System.out.println(avg);
    }
}

//数组反转
class test7 {
    public static void main(String[] args) {
        int[] inversionBefore = {1, 2, 3, 4, 5};
        for (int i =1;i<= inversionBefore.length/2;i++) {
            // 赋值顺序：：右边赋值给左边
            int temp = inversionBefore[i-1];
            inversionBefore[i-1] = inversionBefore[inversionBefore.length - i];
            inversionBefore[inversionBefore.length - i] = temp;
        }System.out.println(Arrays.toString(inversionBefore));
    }
}
